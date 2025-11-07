import { AssignMovesToPokemonDto } from "../../dtos/pokemons/assingn-moves-to-pokemon.dto";
import { Pokemon } from "../../entities/pokemon.entity";
import { PokemonRepository } from "../../repository/pokemon.repository";


export interface AssignMovesToPokemonUseCase {
  execute(assignMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon>;
}

export class AssignMovesToPokemon implements AssignMovesToPokemonUseCase {

  constructor(private readonly repository: PokemonRepository) {}

  execute(assignMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon> {
    return this.repository.assingMoves(assignMovesToPokemonDto);
  }
}