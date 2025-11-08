import { Router } from "express";
import { PokemonController } from "./controller";
import { PostgresPokemonDatasource } from "../../infrastructure/datasources/pokemon/postgres-pokemon.datasource";
import { PokemonRepositoryImpl } from "../../infrastructure/repositories/pokemon/pokemon.repository.impl";
import { PostgresMoveDatasource } from "../../infrastructure/datasources/move/postgres-move.datasource";
import { MoveRepositoryImpl } from "../../infrastructure/repositories/move/move.repository.impl";


export class PokemonRoutes {

    static get routes(): Router {

        const router = Router();
        
        const pokemonDatasource = new PostgresPokemonDatasource();
        const pokemonRepository = new PokemonRepositoryImpl(pokemonDatasource);

        const moveDatasource = new PostgresMoveDatasource();
        const moveRepository = new MoveRepositoryImpl(moveDatasource);

        const pokemonController = new PokemonController(pokemonRepository, moveRepository);

        router.get("/", pokemonController.getPokemons);
        router.get("/:id", pokemonController.getPokemonById);

        router.post("/", pokemonController.createPokemon);
        router.put("/:id", pokemonController.updatePokemon);
        router.delete("/:id", pokemonController.deletePokemon);
        router.post("/:pokemonId/moves", pokemonController.assignMoveToPokemon);
        router.get("/:id/moves", pokemonController.getPokemonMoves);
        router.get("/:id/moves/possible", pokemonController.getPossibleMoves);
        router.delete("/:pokemonId/moves/:moveId", pokemonController.removeMoveFromPokemon);

        return router;
    }
}