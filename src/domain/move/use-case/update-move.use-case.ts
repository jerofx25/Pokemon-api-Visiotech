import { Move } from "../entities/move.entity";
import { MoveRepository } from "../repository/move.repository";
import { UpdateMoveDto } from "../dtos/update-move.dto";

export interface UpdateMoveUseCase {
  execute(dto: UpdateMoveDto): Promise<Move>;
}

export class UpdateMove implements UpdateMoveUseCase {

  constructor(
    private readonly repository: MoveRepository
  ) {}

  execute(dto: UpdateMoveDto): Promise<Move> {
    return this.repository.updateById(dto);
  }
}