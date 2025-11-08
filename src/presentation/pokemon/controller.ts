import { Request, Response } from "express";
import { PokemonRepository } from "../../domain/pokemon/repository/pokemon.repository";
import { CreatePokemon } from "../../domain/pokemon/use-cases/pokemon/create-pokemon.use-case";
import { GetAllPokemon } from "../../domain/pokemon/use-cases/pokemon/get-all-pokemon.use-case";
import { GetPokemon } from "../../domain/pokemon/use-cases/pokemon/get-pokemon.use-case";
import { CreatePokemonDto, UpdatePokemonDto } from "../../domain/pokemon/dtos";
import { UpdatePokemon } from "../../domain/pokemon/use-cases/pokemon/update-pokemon.use-case";
import { DeletePokemon } from "../../domain/pokemon/use-cases/pokemon/delete-pokemon.use-case";
import { Move } from '../../domain/move/entities/move.entity';
import { AssignMovesToPokemonDto } from "../../domain/pokemon/dtos/pokemons/assingn-moves-to-pokemon.dto";
import { AssignMovesToPokemon } from "../../domain/pokemon/use-cases/pokemon/assign-moves-to-pokemon.use-case";
import { GetPokemonMoves } from "../../domain/pokemon/use-cases/pokemon/get-pokemon-moves.use-case";
import { error } from "console";
import { GetPossibleMovesForPokemon } from "../../domain/pokemon/use-cases/pokemon/get-possible-moves.use-case";
import { MoveRepository } from "../../domain/move/repository/move.repository";
import { RemoveMoveFromPokemon } from "../../domain/pokemon/use-cases/pokemon/remove-move-from-pokemon.use-case";
import { RemoveMoveFromPokemonDto } from "../../domain/pokemon/dtos/pokemons/remove-move-from-pokemon.dto";

export class PokemonController {

    constructor(
        private readonly pokemonRepository: PokemonRepository,
        private readonly moveRepository: MoveRepository
    ){}

    public getPokemons = (req: Request, res: Response) => {

        new GetAllPokemon(this.pokemonRepository)
            .execute()
            .then(pokemons => res.json(pokemons))
            .catch(error => res.status(400).json({ error }));
    };

    public getPokemonById = (req: Request, res: Response) => {

        const id = +req.params.id!;

        new GetPokemon(this.pokemonRepository)
            .execute(id)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(400).json({ error }));
    };

    public createPokemon = (req: Request, res: Response) => {

        const [error, createPokemonDto] = CreatePokemonDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreatePokemon(this.pokemonRepository)
            .execute(createPokemonDto!)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(400).json({ error }));
    };

    public updatePokemon = (req: Request, res: Response) => {
        
        const id = +req.params.id!;
        const [error, updatePokemonDto] = UpdatePokemonDto.create({...req.body, id});
        if (error) return  res.status(400).json({ error });

        new UpdatePokemon(this.pokemonRepository)
            .execute(updatePokemonDto!)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(400).json({ error }));
    };

    public deletePokemon = (req: Request, res: Response) => {

        const id = +req.params.id!;

        new DeletePokemon(this.pokemonRepository)
            .execute(id)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(400).json({ error }));
    };

    public assignMoveToPokemon = (req: Request, res: Response) => {

        const pokemonId = +req.params.pokemonId!;
        const {moveIds} = req.body;

        const [error, assingMovesToPokemonDto] = AssignMovesToPokemonDto.create({
            pokemonId,
            moveIds
        });

        if (error) return res.status(400).json({ error });

        new AssignMovesToPokemon(this.pokemonRepository)
            .execute(assingMovesToPokemonDto!)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(400).json({ error: error instanceof Error ? error.message : String(error) }));
    };

    public getPokemonMoves = (req: Request, res: Response) => {

        const id = +req.params.id!;

        new GetPokemonMoves(this.pokemonRepository)
            .execute(id)
            .then(moves => res.json(moves))
            .catch(error => res.status(400).json({ error }));
    };

    public getPossibleMoves = (req: Request, res: Response) => {

        const moveRepository = MoveRepository;

        const id = +req.params.id!;

        new GetPossibleMovesForPokemon(this.pokemonRepository, this.moveRepository)
            .execute(id)
            .then(moves => res.json(moves))
            .catch(error => res.status(400).json({ error }));
    };

    public removeMoveFromPokemon = (req: Request, res: Response) => {

        const pokemonId = +req.params.pokemonId!;
        const moveId = +req.params.moveId!;

        const [error, dto] = RemoveMoveFromPokemonDto.create({ pokemonId, moveId });
        if (error) return res.status(400).json({ error });

        new RemoveMoveFromPokemon(this.pokemonRepository)
            .execute(dto!)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(400).json({ error }));
    };
}