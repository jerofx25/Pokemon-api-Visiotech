import { Move } from "../entities/move.entity";
import { MoveRepository } from "../repository/move.repository";

export interface DeleteMoveUseCase {
  execute(id: number): Promise<Move>;
}

export class DeleteMove implements DeleteMoveUseCase {

  constructor(
    private readonly repository: MoveRepository
  ) {}

  execute(id: number): Promise<Move> {
    return this.repository.deleteById(id);
  }
}