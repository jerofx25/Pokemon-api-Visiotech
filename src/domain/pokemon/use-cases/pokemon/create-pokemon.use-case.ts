import { CreatePokemonDto } from "../../dtos";
import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface CreatePokemonUseCase {
    execute(dto: CreatePokemonDto): Promise<Pokemon>;
}

export class CreatePokemon implements CreatePokemonUseCase {

    constructor(
        private readonly repository: PokemonRepository,
    ) {}

    execute(dto: CreatePokemonDto): Promise<Pokemon> {
        return this.repository.create(dto);
    }   
}