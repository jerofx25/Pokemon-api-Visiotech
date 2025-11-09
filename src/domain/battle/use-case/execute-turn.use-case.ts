
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
        if (!move) throw new Error("No move selected");

        return await this.battleRepository.recordTurn(battle.id, attacker.id, move.id);
    }

}

   
