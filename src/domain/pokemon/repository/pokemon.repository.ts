import { PokemonType } from "../../shared/enums/pokemon-type.enum";
import { CreatePokemonDto, UpdatePokemonDto } from "../dtos";
import { AssignMovesToPokemonDto } from "../dtos/pokemons/assign-moves-to-pokemon.dto";
import { RemoveMoveFromPokemonDto } from "../dtos/pokemons/remove-move-from-pokemon.dto";
import { Pokemon } from "../entities/pokemon.entity";

export abstract class PokemonRepository {

  abstract create(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;

  abstract findAll(): Promise<Pokemon[]>;

  abstract findById(id: number): Promise<Pokemon>;

  abstract updateById(updatePokemonDto: UpdatePokemonDto): Promise<Pokemon>;

  abstract deleteById(id: number): Promise<Pokemon>;

  abstract assignMoves(assignMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon>;

  abstract removeMove(removeMoveFromPokemon: RemoveMoveFromPokemonDto): Promise<Pokemon>;
}