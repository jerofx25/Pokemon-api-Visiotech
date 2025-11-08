import { Router } from "express";
import { PokemonRoutes } from "./pokemon/routes";
import { MoveRoutes } from "./move/routes";



export class AppRouter{

    static get routes(): Router {

        const router = Router();

        router.use("/api/pokemon", PokemonRoutes.routes);
        router.use("/api/move", MoveRoutes.routes);

        return router;
    }
}