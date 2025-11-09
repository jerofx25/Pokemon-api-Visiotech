import { Router } from "express";
import { PostgresBattleDatasource } from "../../infrastructure/datasources/battle/postgres-battle.datasource";
import { BattleRepositoryImpl } from "../../infrastructure/repositories/battle/battle.repository.impl";
import { PostgresPokemonDatasource } from "../../infrastructure/datasources/pokemon/postgres-pokemon.datasource";
import { PokemonRepositoryImpl } from "../../infrastructure/repositories/pokemon/pokemon.repository.impl";
import { BattleController } from "./controller";
import { asyncHandler } from "../middlewares/async-handler";



export class BattleRoutes {

    static get routes(): Router {

        const router = Router();

        const battleDatasource = new PostgresBattleDatasource();
        const battleRepository = new BattleRepositoryImpl(battleDatasource);

        const pokemonDatasource = new PostgresPokemonDatasource();
        const pokemonRepository = new PokemonRepositoryImpl(pokemonDatasource);

        const battleController = new BattleController(
            battleRepository,
            pokemonRepository,
        );

        router.post("/start", asyncHandler(battleController.startBattle));
        router.get("/:id", asyncHandler(battleController.getBattle));
        router.post("/:battleId/turn", asyncHandler(battleController.executeTurn));

        return router;
    }
}