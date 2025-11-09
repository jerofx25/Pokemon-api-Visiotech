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

    public getMoves = async (req: Request, res: Response) => {

        const move = new FindAllMoves(this.moveRepository).execute();

        res.json(move);

    };

    public getMoveById = async (req: Request, res: Response) => {

        const id = Number(req.params.id!);
        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const move = await new FindMoveById(this.moveRepository).execute(id)

        res.json(move);
    };

    public createMove = async (req: Request, res: Response) => {

        const [error, dto] = CreateMoveDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const move = await new CreateMove(this.moveRepository).execute(dto!)

        res.json(move);
    };

    public updateMove = async (req: Request, res: Response) => {

        const id = Number(req.params.id!);
        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const [error, dto] = UpdateMoveDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        const move = await new UpdateMove(this.moveRepository).execute(dto!)

        res.json(move);
    };

    public deleteMove = async(req: Request, res: Response) => {

        const id = Number(req.params.id!);
        if (Number.isNaN(id)) throw { status: 400, message: "Invalid id" };

        const move = await new DeleteMove(this.moveRepository).execute(id)

        res.json(move);
    };

}