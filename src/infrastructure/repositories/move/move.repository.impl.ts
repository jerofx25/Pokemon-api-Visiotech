import { MoveDatasource } from "../../../domain/move/datasource/move.datasource";
import { CreateMoveDto } from "../../../domain/move/dtos/create-move.dto";
import { UpdateMoveDto } from "../../../domain/move/dtos/update-move.dto";
import { Move } from "../../../domain/move/entities/move.entity";
import { MoveRepository } from "../../../domain/move/repository/move.repository";



export class MoveRepositoryImpl implements MoveRepository{

    constructor(
        private readonly datasource: MoveDatasource,
    ){}

    create(createMoveDto: CreateMoveDto): Promise<Move> {
        return this.datasource.create(createMoveDto);
    }

    findAll(): Promise<Move[]> {
        return this.datasource.findAll();
    }

    findById(id: number): Promise<Move> {
        return this.datasource.findById(id);
    }

    updateById(updateMoveDto: UpdateMoveDto): Promise<Move> {
        return this.datasource.updateById(updateMoveDto);
    }

    deleteById(id: number): Promise<Move> {
        return this.datasource.deleteById(id);
    }

}