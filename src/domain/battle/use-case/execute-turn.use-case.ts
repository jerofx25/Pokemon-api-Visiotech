
import { PokemonRepository } from "../../pokemon/repository/pokemon.repository";
import { ExecuteTurnDto } from "../dto/execute-turn.dto";
import { StartBattleDto } from "../dto/start-battle.dto";
import { Battle } from "../entities/battle.entity";
import { BattleRepository } from "../repository/battle.repository";


export interface ExecuteTurnUseCase {

    execute(executeTurnDto: ExecuteTurnDto): Promise<Battle>;
}

export class ExecuteTurn implements  ExecuteTurnUseCase {

    constructor(
        private readonly battleRepository: BattleRepository,
        private readonly pokemonRepository: PokemonRepository,
    ) {}

    async execute(executeTurnDto: ExecuteTurnDto): Promise<Battle> {
     
        const battle = await this.battleRepository.getBattle(executeTurnDto.battleId);
        const { pokemonA, pokemonB, turns } = battle;

        const attacker = turns.length % 2 === 0 ? pokemonA : pokemonB;
        const defender = attacker.id === pokemonA.id ? pokemonB : pokemonA;

        if (attacker.moves.length === 0) throw new Error("Attacker has no moves");
        const move = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];

        const rawDamage = (attacker.attack * move!.power) / defender.defense;
        const randomFactor = Math.floor(Math.random() * 10);
        const damage = Math.max(1, Math.floor(rawDamage + randomFactor));

        const finalHp = Math.max(0, defender.currentHp - damage);

        await this.battleRepository.recordTurn(battle.id, attacker.id, move!.id);

        if (finalHp <= 0) {
            return this.battleRepository.finishBattle(battle.id, attacker.id);
        }

        return this.battleRepository.getBattle(battle.id);
    }

}

   
