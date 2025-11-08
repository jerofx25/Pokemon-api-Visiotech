import { PokemonType } from "../../shared/enums/pokemon-type.enum";
import { CreatePokemonDto, UpdatePokemonDto } from "../dtos";
import { AssignMovesToPokemonDto } from "../dtos/pokemons/assingn-moves-to-pokemon.dto";
import { Pokemon } from "../entities/pokemon.entity";

export abstract class PokemonRepository {

  abstract create(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;

  abstract findAll(): Promise<Pokemon[]>;

  abstract findById(id: number): Promise<Pokemon>;

  abstract updateById(updatePokemonDto: UpdatePokemonDto): Promise<Pokemon>;

  abstract deleteById(id: number): Promise<Pokemon>;

  abstract assingMoves(assingMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon>;

}