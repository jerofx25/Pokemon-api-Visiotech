import { Move } from "../../../move/entities/move.entity";
import { MoveRepository } from "../../../move/repository/move.repository";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface GetPokemonMovesUseCase {
  execute(pokemonId: number): Promise<Move[]>
}


export class GetPossibleMovesForPokemon implements GetPokemonMovesUseCase {
  
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly moveRepository: MoveRepository

  ) {}
  
  async execute(pokemonId: number): Promise<Move[]> {
    
    const pokemon = await this.pokemonRepository.findById(pokemonId);

    return this.moveRepository.findAllByType(pokemon.type);
  }

}