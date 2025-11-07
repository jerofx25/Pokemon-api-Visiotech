
import { CreateMoveDto } from "../dtos/create-move.dto";
import { UpdateMoveDto } from "../dtos/update-move.dto";
import { Move } from "../entities/move.entity";



export abstract class MoveDatasource {

  abstract create(createPokemonDto: CreateMoveDto): Promise<Move>;

  abstract findAll(): Promise<Move[]>;

  abstract findById(id: number): Promise<Move>;

  abstract updateById(updatePokemonDto: UpdateMoveDto): Promise<Move>;

  abstract deleteById(id: number): Promise<Move>;

}