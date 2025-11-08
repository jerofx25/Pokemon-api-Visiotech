import { Router } from "express";
import { PokemonRoutes } from "./pokemon/routes";
import { MoveRoutes } from "./move/routes";
import { BattleRoutes } from "./battle/routes";



export class AppRouter{

    static get routes(): Router {

        const router = Router();

        router.use("/pokemon", PokemonRoutes.routes);
        router.use("/move", MoveRoutes.routes);
        router.use("/battle", BattleRoutes.routes);

        return router;
    }
}