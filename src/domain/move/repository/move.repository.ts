
import { CreateMoveDto } from "../dtos/create-move.dto";
import { UpdateMoveDto } from "../dtos/update-move.dto";
import { Move } from "../entities/move.entity";



export abstract class MoveRepository {

  abstract create(createMoveDto: CreateMoveDto): Promise<Move>;

  abstract findAll(): Promise<Move[]>;

  abstract findById(id: number): Promise<Move>;

  abstract updateById(updateMoveDto: UpdateMoveDto): Promise<Move>;

  abstract deleteById(id: number): Promise<Move>;

  abstract findAllByType(type: string): Promise<Move[]>;
}