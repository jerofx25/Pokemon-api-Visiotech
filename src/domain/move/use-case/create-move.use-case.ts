import { Move } from "../entities/move.entity";
import { CreateMoveDto } from "../dtos/create-move.dto";
import { MoveRepository } from "../repository/move.repository";

export interface CreateMoveUseCase {
  execute(dto: CreateMoveDto): Promise<Move>;
}

export class CreateMove implements CreateMoveUseCase {

  constructor(
    private readonly repository: MoveRepository
  ) {}

  execute(dto: CreateMoveDto): Promise<Move> {
    return this.repository.create(dto);
  }
}