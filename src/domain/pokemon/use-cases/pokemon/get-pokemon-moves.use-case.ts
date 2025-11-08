import { Move } from "../../../move/entities/move.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";



export interface GetPokemonMovesUseCase {
  execute(id: number): Promise<Move[]>
}


export class GetPokemonMoves implements GetPokemonMovesUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  async execute(id: number): Promise<Move[]> {
    const pokemon = await this.repository.findById(id);

    return pokemon.moves;
  }

}