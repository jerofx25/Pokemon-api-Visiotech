import { Router } from "express";
import { PokemonController } from "./controller";
import { PostgresPokemonDatasource } from "../../infrastructure/datasources/pokemon/postgres-pokemon.datasource";
import { PokemonRepositoryImpl } from "../../infrastructure/repositories/pokemon/pokemon.repository.impl";
import { PostgresMoveDatasource } from "../../infrastructure/datasources/move/postgres-move.datasource";
import { MoveRepositoryImpl } from "../../infrastructure/repositories/move/move.repository.impl";
import { asyncHandler } from "../middlewares/async-handler";

export class PokemonRoutes {

    static get routes(): Router {

        const router = Router();
        
        const pokemonDatasource = new PostgresPokemonDatasource();
        const pokemonRepository = new PokemonRepositoryImpl(pokemonDatasource);

        const moveDatasource = new PostgresMoveDatasource();
        const moveRepository = new MoveRepositoryImpl(moveDatasource);

        const pokemonController = new PokemonController(pokemonRepository, moveRepository);

        router.get("/", asyncHandler(pokemonController.getPokemons));
        router.get("/:id", asyncHandler(pokemonController.getPokemonById));
        router.post("/", asyncHandler(pokemonController.createPokemon));
        router.put("/:id", asyncHandler(pokemonController.updatePokemon));
        router.delete("/:id", asyncHandler(pokemonController.deletePokemon));
        router.post("/:pokemonId/moves", asyncHandler(pokemonController.assignMoveToPokemon));
        router.get("/:id/moves", asyncHandler(pokemonController.getPokemonMoves));
        router.get("/:id/moves/possible", asyncHandler(pokemonController.getPossibleMoves));
        router.delete("/:pokemonId/moves/:moveId", asyncHandler(pokemonController.removeMoveFromPokemon));

        return router;
    }
}