import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";



export interface GetTodoUseCase {
  execute( id: number ): Promise<Pokemon>
}


export class GetPokemon implements GetTodoUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute( id: number ): Promise<Pokemon> {
    return this.repository.findById(id);
  }

}
