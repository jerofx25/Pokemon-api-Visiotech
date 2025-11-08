import { PokemonRepository } from "../../pokemon/repository/pokemon.repository";
import { StartBattleDto } from "../dto/start-battle.dto";
import { Battle } from "../entities/battle.entity";
import { BattleRepository } from "../repository/battle.repository";


export interface StartBattleUseCase {

    execute(startBattleDto: StartBattleDto): Promise<Battle>;
}

export class StartBattle implements StartBattleUseCase {

    constructor(
        private readonly battleRepository: BattleRepository,
        private readonly pokemonRepository: PokemonRepository,
    ) {}

    async execute(startBattleDto: StartBattleDto): Promise<Battle> {
        
        const pokemonA = await this.pokemonRepository.findById(startBattleDto.pokemonAId);
        const pokemonB = await this.pokemonRepository.findById(startBattleDto.pokemonBId);

        return this.battleRepository.startBattle(pokemonA.id, pokemonB.id);
    }
}