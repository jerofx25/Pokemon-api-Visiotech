import { PokemonDatasource } from '../../../domain/pokemon/datasource/pokemon.datasource';
import { CreatePokemonDto, UpdatePokemonDto } from '../../../domain/pokemon/dtos';
import { AssignMovesToPokemonDto } from '../../../domain/pokemon/dtos/pokemons/assign-moves-to-pokemon.dto';
import { RemoveMoveFromPokemonDto } from '../../../domain/pokemon/dtos/pokemons/remove-move-from-pokemon.dto';
import { Pokemon } from '../../../domain/pokemon/entities/pokemon.entity';
import { PokemonRepository } from '../../../domain/pokemon/repository/pokemon.repository';



export class PokemonRepositoryImpl implements PokemonRepository {

    constructor(private readonly datasource: PokemonDatasource) {}

    removeMove(removeMoveFromPokemon: RemoveMoveFromPokemonDto): Promise<Pokemon> {
        return this.datasource.removeMove(removeMoveFromPokemon);
    }

    assignMoves(assignMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon> {
        return this.datasource.assignMoves(assignMovesToPokemonDto);
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