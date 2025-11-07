import { Move } from "../entities/move.entity";
import { MoveRepository } from "../repository/move.repository";

export interface FindAllMovesUseCase {
  execute(): Promise<Move[]>;
}

export class FindAllMoves implements FindAllMovesUseCase {

  constructor(
    private readonly repository: MoveRepository
  ) {}

  execute(): Promise<Move[]> {
    return this.repository.findAll();
  }
}