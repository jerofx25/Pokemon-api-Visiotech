import { Router } from "express";
import { PokemonController } from "./controller";


export class PokemonRoutes {

    static get routes(): Router {

        const router = Router();
        const pokemonController = new PokemonController();

        router.get("/", pokemonController.getPokemon);

        return router;
    }
}