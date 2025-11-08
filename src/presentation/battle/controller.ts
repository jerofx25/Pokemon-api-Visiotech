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

    public startBattle = (req: Request, res: Response) => {

        const [error, dto] = StartBattleDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new StartBattle(this.battleRepository, this.pokemonRepository)
            .execute(dto!)
            .then(battle => res.json(battle))
            .catch(error => res.status(400).json({ error }));
    }

    public getBattle = (req: Request, res: Response) => {

        const battleId = +req.params.id!;

        this.battleRepository.getBattle(battleId)
            .then(battle => res.json(battle))
            .catch(error => res.status(400).json({ error }));
    };

    public executeTurn = async (req: Request, res: Response) => {

        const battleId = +req.params.battleId!;

        const [error, dto] = ExecuteTurnDto.create({battleId});
        if (error) return res.status(400).json({ error });

        new ExecuteTurn(this.battleRepository, this.pokemonRepository)
            .execute(dto!)
            .then(battle => res.json(battle))  
            .catch(error => {
                console.error(error);
                
                res.status(400).json({ error })
            });
    };
}