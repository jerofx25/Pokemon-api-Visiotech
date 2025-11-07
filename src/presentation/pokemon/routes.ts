import { Router } from "express";
import { PokemonController } from "./controller";
import { PostgresPokemonDatasource } from "../../infrastructure/datasources/pokemon/postgres-pokemon.datasource";
import { PokemonRepositoryImpl } from "../../infrastructure/repositories/pokemon/pokemon.repository.impl";


export class PokemonRoutes {

    static get routes(): Router {

        const router = Router();
        
        const datasource = new PostgresPokemonDatasource();
        const pokemonRepository = new PokemonRepositoryImpl(datasource);
        const pokemonController = new PokemonController(pokemonRepository);

        router.get("/", pokemonController.getPokemons);
        router.get("/:id", pokemonController.getPokemonById);

        router.post("/", pokemonController.createPokemon);
        router.put("/:id", pokemonController.updatePokemon);
        router.delete("/:id", pokemonController.deletePokemon);
        router.post("/:id/moves", pokemonController.assingMoveToPokemon);

        return router;
    }
}