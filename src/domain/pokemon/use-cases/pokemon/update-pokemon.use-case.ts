import { UpdatePokemonDto } from "../../dtos";
import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface UpdatePokemonUseCase {
  execute( dto: UpdatePokemonDto ): Promise<Pokemon>
}


export class UpdatePokemon implements UpdatePokemonUseCase {
  
  constructor(
    private readonly repository: PokemonRepository,
  ) {}
  
  execute( dto: UpdatePokemonDto ): Promise<Pokemon> {
    return this.repository.updateById(dto);
  }

}
