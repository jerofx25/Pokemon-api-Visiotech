import { Router } from "express";
import { PokemonRoutes } from "./pokemon/routes";



export class AppRouter{

    static get routes(): Router {

        const router = Router();

        router.use("/api/pokemon", PokemonRoutes.routes);

        return router;
    }
}