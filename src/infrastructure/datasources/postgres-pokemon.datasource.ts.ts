import { PokemonDatasource } from "../../domain/pokemon/datasource/pokemon.datasource";
import { Pokemon } from "../../domain/pokemon/entities/pokemon.entity";


export class PostgresPokemonDatasource implements PokemonDatasource {
    create(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Pokemon[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Pokemon | null> {
        throw new Error("Method not implemented.");
    }
    update(pokemon: Pokemon): Promise<Pokemon> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}