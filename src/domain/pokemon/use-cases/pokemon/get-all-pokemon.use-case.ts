import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";



export interface GetPokemonUseCase {
  execute(): Promise<Pokemon[]>
}


export class GetAllPokemon implements GetPokemonUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute(): Promise<Pokemon[]> {
    return this.repository.findAll();
  }

}