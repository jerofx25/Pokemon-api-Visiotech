import { ExecuteTurnDto } from '../../domain/battle/dto/execute-turn.dto';
import { StartBattleDto } from '../../domain/battle/dto/start-battle.dto';
import { BattleRepository } from '../../domain/battle/repository/battle.repository';
import { ExecuteTurn } from '../../domain/battle/use-case/execute-turn.use-case';
import { StartBattle } from '../../domain/battle/use-case/start-battle.use-case';
import { PokemonRepository } from '../../domain/pokemon/repository/pokemon.repository';
import { Request, Response } from "express";


export class BattleController {

    constructor(
        private readonly battleRepository: BattleRepository,
        private readonly pokemonRepository: PokemonRepository,
    ){}

    public startBattle = async (req: Request, res: Response) => {

        const [error, dto] = StartBattleDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const battle = await new StartBattle(this.battleRepository, this.pokemonRepository).execute(dto!);
        
        res.json(battle);
    }

    public getBattle = async (req: Request, res: Response) => {

        const battleId = +req.params.id!;

        if (Number.isNaN(battleId)) throw { status: 400, message: "Invalid id" };

        const battle = await this.battleRepository.getBattle(battleId);

        res.json(battle);
    };

    public executeTurn = async (req: Request, res: Response) => {

        const battleId = +req.params.battleId!;

        if (Number.isNaN(battleId)) throw { status: 400, message: "Invalid id" };

        const [error, dto] = ExecuteTurnDto.create({battleId});
        if (error) return res.status(400).json({ message: error});

        const battle = await new ExecuteTurn(this.battleRepository, this.pokemonRepository).execute(dto!)

        res.json(battle);
    };
}