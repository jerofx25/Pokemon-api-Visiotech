
import { CreatePokemonDto, UpdatePokemonDto } from '../dtos';
import { Pokemon } from '../entities/pokemon.entity';

export abstract class PokemonDatasource {

  abstract create(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;

  abstract findAll(): Promise<Pokemon[]>;

  abstract findById(id: number): Promise<Pokemon>;

  abstract updateById(updatePokemonDto: UpdatePokemonDto): Promise<Pokemon>;

  abstract deleteById(id: number): Promise<Pokemon>;

}