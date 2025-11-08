import { MoveRepository } from "../../domain/move/repository/move.repository";
import { FindAllMoves } from "../../domain/move/use-case/find-all-moves.use-case";
import { Request, Response } from 'express';
import { FindMoveById } from "../../domain/move/use-case/find-move-by-id.use-case";
import { CreateMove } from "../../domain/move/use-case/create-move.use-case";
import { CreateMoveDto } from "../../domain/move/dtos/create-move.dto";
import { UpdateMoveDto } from "../../domain/move/dtos/update-move.dto";
import { UpdateMove } from "../../domain/move/use-case/update-move.use-case";
import { DeleteMove } from "../../domain/move/use-case/delete-move.use-case";



export class MoveController {

    constructor(
        private readonly moveRepository: MoveRepository
    ){}

    public getMoves = (req: Request, res: Response) => {

        new FindAllMoves(this.moveRepository)
            .execute()
            .then(moves => res.json(moves))
            .catch(error => res.status(400).json({error}))
    };

    public getMoveById = (req: Request, res: Response) => {

        const id = +req.params.id!;
        new FindMoveById(this.moveRepository)
            .execute(id)
            .then(move => res.json(move))
            .catch(error => res.status(400).json({ error }));
    };

    public createMove = (req: Request, res: Response) => {

        const [error, dto] = CreateMoveDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateMove(this.moveRepository)
            .execute(dto!)
            .then(move => res.json(move))
            .catch(error => res.status(400).json(error));
    };

    public updateMove = (req: Request, res: Response) => {

        const id = +req.params.id!;
        const [error, dto] = UpdateMoveDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateMove(this.moveRepository)
            .execute(dto!)
            .then(move => res.json(move))
            .catch(error => res.status(400).json(error));
    };

    public deleteMove = (req: Request, res: Response) => {

        const id = +req.params.id!;
        new DeleteMove(this.moveRepository)
            .execute(id)
            .then(move => res.json(move))
            .catch(err => res.status(400).json({ error: err.toString() }));
    };

}