import { Request, Response } from "express";
import { PokemonRepository } from "../../domain/pokemon/repository/pokemon.repository";
import { CreatePokemon } from "../../domain/pokemon/use-cases/pokemon/create-pokemon.use-case";
import { GetAllPokemon } from "../../domain/pokemon/use-cases/pokemon/get-all-pokemon.use-case";
import { GetPokemon } from "../../domain/pokemon/use-cases/pokemon/get-pokemon.use-case";
import { CreatePokemonDto, UpdatePokemonDto } from "../../domain/pokemon/dtos";
import { UpdatePokemon } from "../../domain/pokemon/use-cases/pokemon/update-pokemon.use-case";
import { DeletePokemon } from "../../domain/pokemon/use-cases/pokemon/delete-pokemon.use-case";
import { AssignMovesToPokemonDto } from "../../domain/pokemon/dtos/pokemons/assign-moves-to-pokemon.dto";
import { AssignMovesToPokemon } from "../../domain/pokemon/use-cases/pokemon/assign-moves-to-pokemon.use-case";
import { GetPokemonMoves } from "../../domain/pokemon/use-cases/pokemon/get-pokemon-moves.use-case";
import { GetPossibleMovesForPokemon } from "../../domain/pokemon/use-cases/pokemon/get-possible-moves.use-case";
import { MoveRepository } from "../../domain/move/repository/move.repository";
import { RemoveMoveFromPokemon } from "../../domain/pokemon/use-cases/pokemon/remove-move-from-pokemon.use-case";
import { RemoveMoveFromPokemonDto } from "../../domain/pokemon/dtos/pokemons/remove-move-from-pokemon.dto";

export class PokemonController {

    constructor(
        private readonly pokemonRepository: PokemonRepository,
        private readonly moveRepository: MoveRepository
    ){}

    public getPokemons = async (req: Request, res: Response) => {

        const pokemon = await new GetAllPokemon(this.pokemonRepository).execute()
        res.status(200).json(pokemon);
    };

    public getPokemonById = async (req: Request, res: Response) => {

        const id = Number(req.params.id!);

        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const pokemon = await new GetPokemon(this.pokemonRepository).execute(id);
        res.status(200).json(pokemon);
    };

    public createPokemon = async (req: Request, res: Response) => {

        const [error, createPokemonDto] = CreatePokemonDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const pokemon = await new CreatePokemon(this.pokemonRepository).execute(createPokemonDto!)
            
        res.status(201).location(`/pokemon/${pokemon.id}`).json(pokemon);
    };

    public updatePokemon = async (req: Request, res: Response) => {
        
        const id = Number(req.params.id!);

        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const [error, updatePokemonDto] = UpdatePokemonDto.create({...req.body, id});
        if (error) return  res.status(400).json({ error });

        const pokemon = await new UpdatePokemon(this.pokemonRepository).execute(updatePokemonDto!)
        
        res.status(200).json(pokemon);
    };

    public deletePokemon = async (req: Request, res: Response) => {

        const id = Number(req.params.id!);

        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const pokemon = await new DeletePokemon(this.pokemonRepository).execute(id)
            
        res.status(204).send();
    };

    public assignMoveToPokemon = async (req: Request, res: Response) => {

        const pokemonId = Number(req.params.pokemonId!);

        if (Number.isNaN(pokemonId)) throw { status: 400, message: "Invalid id" };

        const {moveIds} = req.body;

        const [error, assingMovesToPokemonDto] = AssignMovesToPokemonDto.create({
            pokemonId,
            moveIds
        });

        if (error) return res.status(400).json({ error });

        const pokemon = await new AssignMovesToPokemon(this.pokemonRepository).execute(assingMovesToPokemonDto!)
            
        res.status(200).json(pokemon);
    };

    public getPokemonMoves = async (req: Request, res: Response) => {

        const id = Number(req.params.id!);

        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const pokemon = await new GetPokemonMoves(this.pokemonRepository).execute(id)
            
        res.status(200).json(pokemon);
    };

    public getPossibleMoves = async (req: Request, res: Response) => {

        const id = Number(req.params.id!);

        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const pokemon = await new GetPossibleMovesForPokemon(this.pokemonRepository, this.moveRepository).execute(id)
        
        res.status(200).json(pokemon);
    };

    public removeMoveFromPokemon = async (req: Request, res: Response) => {

        const pokemonId = Number(req.params.pokemonId!);
        if (Number.isNaN(pokemonId)) throw { status: 400, message: "Invalid id" };

        const moveId = Number(req.params.moveId!);
        if (Number.isNaN(moveId)) throw { status: 400, message: "Invalid id" };

        const [error, dto] = RemoveMoveFromPokemonDto.create({ pokemonId, moveId });
        if (error) return res.status(400).json({ error });

        const pokemon = await new RemoveMoveFromPokemon(this.pokemonRepository).execute(dto!)
          
        res.status(204).send();
    };
}