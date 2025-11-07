import { Move } from "../entities/move.entity";
import { MoveRepository } from "../repository/move.repository";

export interface FindMoveByIdUseCase {
  execute(id: number): Promise<Move>;
}

export class FindMoveById implements FindMoveByIdUseCase {

  constructor(
    private readonly repository: MoveRepository
  ) {}

  execute(id: number): Promise<Move> {
    return this.repository.findById(id);
  }
}