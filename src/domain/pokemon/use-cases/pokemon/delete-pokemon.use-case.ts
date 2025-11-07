import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface DeleteTodoUseCase {
  execute( id: number ): Promise<Pokemon>
}


export class DeleteTodo implements DeleteTodoUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute( id: number ): Promise<Pokemon> {
    return this.repository.deleteById(id);
  }

}