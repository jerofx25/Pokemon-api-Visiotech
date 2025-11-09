import { BattleDatasource } from "../../../domain/battle/datasource/battle.datasource";
import { Battle } from "../../../domain/battle/entities/battle.entity";
import { prisma } from "../../../data/postgres";
import { typeEffectiveness } from "../../../domain/battle/effectiveness";



export class PostgresBattleDatasource implements BattleDatasource{

    async startBattle(pokemonAId: number, pokemonBId: number): Promise<Battle> {
        
        const pokemonA = await prisma.pokemon.findUnique({ where: { id: pokemonAId }});
        const pokemonB = await prisma.pokemon.findUnique({ where: { id: pokemonBId }});

        if (!pokemonA || !pokemonB)
        throw new Error("Both Pokémon must exist to start a battle");

        const battle = await prisma.battle.create({
            data: {
                pokemonAId,
                pokemonBId,
                hpA: pokemonA.currentHp,
                hpB: pokemonB.currentHp,
                currentAttackerId: pokemonAId,
                status: "in_progress"
            },
            include: {
                pokemonA: { include: { moves: { include: { move: true }}} },
                pokemonB: { include: { moves: { include: { move: true }}} },
                turns: true
            }
        });

        return Battle.fromObject(battle);
    };

    async getBattle(battleId: number): Promise<Battle> {
        
        const battle = await prisma.battle.findUnique({
            where: { id: battleId },
            include: {
                pokemonA: { include: { moves: { include: { move: true } } } },
                pokemonB: { include: { moves: { include: { move: true } } } },
                turns: {
                    orderBy: { turnNumber: 'asc' },
                    include: {
                        attacker: { include: { moves: { include: { move: true } } } },
                        defender: { include: { moves: { include: { move: true } } } },
                        move: true
                    }
                }
            }
        });

        if (!battle) throw new Error(`Battle with id ${battleId} not found`);

        battle.pokemonA.currentHp = battle.hpA;
        battle.pokemonB.currentHp = battle.hpB;

        return Battle.fromObject(battle);
    };

    async recordTurn(battleId: number, attackerId: number, moveId: number): Promise<Battle> {
        
        const battle = await prisma.battle.findUnique({ where: { id: battleId }});
        if (!battle) throw new Error("Battle not found");

        if(battle.status === "finished"){
            throw new Error("This battle has already been completed.")
        }

        const attackerIsA = battle.pokemonAId === attackerId;
        const defenderId = attackerIsA ? battle.pokemonBId : battle.pokemonAId;

        const attacker = await prisma.pokemon.findUnique({ where: { id: attackerId }});
        const defender = await prisma.pokemon.findUnique({ where: { id: defenderId }});
        const move = await prisma.move.findUnique({ where: { id: moveId }});

        if (!attacker || !defender || !move)
            throw new Error("Invalid turn data");


        const pokemonMove = await prisma.pokemonMove.findFirst({
            where: { pokemonId: attackerId, moveId }
        });

        if (!pokemonMove) throw new Error("This Pokémon does not know that move");
        if (pokemonMove.pp! <= 0) throw new Error("No PP left for that move");

        await prisma.pokemonMove.update({
            where: { id: pokemonMove.id },
            data: { pp: { decrement: 1 } }
        });

        const hitChance = move.accuracy ?? 100;
        const hitRoll = Math.random() * 100;

        const moveHits = hitRoll <= hitChance;

        let finalDamage = 0;
        let effectiveness = 1;

        if (moveHits) {

            const attackStat = move.category === "special" ? attacker.specialAttack : attacker.attack;
            const defenseStat = move.category === "special" ? defender.specialDefense : defender.defense;

            const stab = attacker.type === move.type ? 1.5 : 1;

            effectiveness = typeEffectiveness[move.type]?.[defender.type] ?? 1;

            const randomFactor = (Math.floor(Math.random() * 16) + 85) / 100; 

            const baseDamage =
                (((2 * attacker.level / 5 + 2) * attackStat * move.power) / defenseStat) / 50 + 2;

            finalDamage = Math.max(1, Math.floor(baseDamage * stab * effectiveness * randomFactor));

            if(effectiveness === 0) finalDamage = 0;
            
        }

        finalDamage = Math.max(0, finalDamage);

        const newHp = attackerIsA ? battle.hpB - finalDamage : battle.hpA - finalDamage;
        const defenderHpAfter = Math.max(0, newHp);
        const attackerHpAfter = attackerIsA ? battle.hpA : battle.hpB;

        let message = `${attacker.name} used ${move.name}! `;

        if (!moveHits) {
            message += "But it missed!";
        }else{
            if (effectiveness > 1) message += "It's super effective! ";
            else if (effectiveness < 1 && effectiveness > 0) message += "It's not very effective... ";
            else if (effectiveness === 0) message += "It had no effect... ";
        }

        await prisma.battleTurn.create({
            data: {
                battleId,
                turnNumber: battle.turn,
                attackerId,
                defenderId,
                moveId,
                damage: finalDamage,
                effectiveness,
                randomRoll: Math.floor((Math.random() * 16) + 85),
                defenderHpAfter,
                attackerHpAfter,
                hit: moveHits,
                message: message
            }
        });

        if (defenderHpAfter <= 0) {
            return this.finishBattle(battleId, attackerId);
        }

  
        await prisma.battle.update({
            where: { id: battleId },
            data: {
                turn: battle.turn + 1,
                currentAttackerId: defenderId,
                hpA: attackerIsA ? battle.hpA : defenderHpAfter,
                hpB: attackerIsA ? defenderHpAfter : battle.hpB
            }
        });

        return this.getBattle(battleId);
    };

    async finishBattle(battleId: number, winnerId: number): Promise<Battle> {
        
        const battle = await prisma.battle.update({
            where: { id: battleId },
            data: { status: "finished", winnerId },
            include: {
                pokemonA: true,
                pokemonB: true,
                turns: true
            }
        });

        return Battle.fromObject(battle);

    };
}