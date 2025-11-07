import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";



export interface GetTodosUseCase {
  execute(): Promise<Pokemon[]>
}


export class GetTodos implements GetTodosUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute(): Promise<Pokemon[]> {
    return this.repository.findAll();
  }

}