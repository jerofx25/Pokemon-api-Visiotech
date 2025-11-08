

import { RemoveMoveFromPokemonDto } from "../../dtos/pokemons/remove-move-from-pokemon.dto";
import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface RemoveMoveFromPokemonUseCase {
  execute( dto: RemoveMoveFromPokemonDto ): Promise<Pokemon>
}


export class RemoveMoveFromPokemon implements RemoveMoveFromPokemonUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute( dto: RemoveMoveFromPokemonDto ): Promise<Pokemon> {
    return this.repository.removeMove(dto);
  }

}
