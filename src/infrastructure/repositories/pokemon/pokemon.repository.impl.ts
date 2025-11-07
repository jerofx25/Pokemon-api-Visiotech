import { PokemonDatasource } from '../../../domain/pokemon/datasource/pokemon.datasource';
import { CreatePokemonDto, UpdatePokemonDto } from '../../../domain/pokemon/dtos';
import { AssignMovesToPokemonDto } from '../../../domain/pokemon/dtos/pokemons/assingn-moves-to-pokemon.dto';
import { Pokemon } from '../../../domain/pokemon/entities/pokemon.entity';
import { PokemonRepository } from '../../../domain/pokemon/repository/pokemon.repository';



export class PokemonRepositoryImpl implements PokemonRepository {

    constructor(private readonly datasource: PokemonDatasource) {}

    assingMoves(assingMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon> {
        return this.datasource.assingMoves(assingMovesToPokemonDto);
    }

    create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
        return this.datasource.create(createPokemonDto);
    }

    findAll(): Promise<Pokemon[]> {
        return this.datasource.findAll();
    }

    findById(id: number): Promise<Pokemon> {
        return this.datasource.findById(id);
    }

    updateById(updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        return this.datasource.updateById(updatePokemonDto);
    }
    deleteById(id: number): Promise<Pokemon> {
        return this.datasource.deleteById(id);
    }

    
}