import { BattleDatasource } from "../../../domain/battle/datasource/battle.datasource";
import { BattleTurn } from "../../../domain/battle/entities/battle-turn.entity";
import { Battle } from "../../../domain/battle/entities/battle.entity";
import { prisma } from "../../../data/postgres";



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

        const attackerIsA = battle.pokemonAId === attackerId;
        const defenderId = attackerIsA ? battle.pokemonBId : battle.pokemonAId;

        const attacker = await prisma.pokemon.findUnique({ where: { id: attackerId }});
        const defender = await prisma.pokemon.findUnique({ where: { id: defenderId }});
        const move = await prisma.move.findUnique({ where: { id: moveId }});

        if (!attacker || !defender || !move)
        throw new Error("Invalid turn data");

        const rawDamage = attacker.attack * move.power / defender.defense;
        const randomRoll = Math.floor(Math.random() * 10);
        const damage = Math.max(1, Math.floor(rawDamage + randomRoll));

        const newHp = attackerIsA ? battle.hpB - damage : battle.hpA - damage;

        const defenderHpAfter = Math.max(0, newHp);
        const attackerHpAfter = attackerIsA ? battle.hpA : battle.hpB;

        if(defenderHpAfter <= 0){
            await prisma.battleTurn.create({
                data: {
                    battleId,
                    turnNumber: battle.turn,
                    attackerId,
                    defenderId,
                    moveId,
                    damage,
                    effectiveness: 1,
                    randomRoll,
                    defenderHpAfter,
                    attackerHpAfter
                }
            });

            return this.finishBattle(battleId, attackerId);
        }

        await prisma.battleTurn.create({
            data: {
                battleId,
                turnNumber: battle.turn,
                attackerId,
                defenderId,
                moveId,
                damage,
                effectiveness: 1,
                randomRoll,
                defenderHpAfter,
                attackerHpAfter
            }
        });

    
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