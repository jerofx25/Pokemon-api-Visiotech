import { Request, Response } from "express";

export class PokemonController {

    constructor(){}

    public getPokemon = async(req: Request, res: Response) => {

        const pokemons = [
            { id: 1, name: "Bulbasaur" },
            { id: 2, name: "Charmander" },
            { id: 3, name: "Squirtle" }
        ];

        return res.json(pokemons);
    }
}