import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface DeletePokemonUseCase {
  execute( id: number ): Promise<Pokemon>
}


export class DeletePokemon implements DeletePokemonUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute( id: number ): Promise<Pokemon> {
    return this.repository.deleteById(id);
  }

}