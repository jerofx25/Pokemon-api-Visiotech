import { prisma } from "../../../data/postgres";
import { MoveDatasource } from "../../../domain/move/datasource/move.datasource";
import { CreateMoveDto } from "../../../domain/move/dtos/create-move.dto";
import { UpdateMoveDto } from "../../../domain/move/dtos/update-move.dto";
import { Move } from "../../../domain/move/entities/move.entity";



export class PostgresMoveDatasource implements MoveDatasource {

    async create(createMoveDto: CreateMoveDto): Promise<Move> {
        
        const move = await prisma.move.create({
            data: {...createMoveDto}
        });

        return Move.fromObject(move);
    }

    async findAll(): Promise<Move[]> {
        
        const moves = await prisma.move.findMany();
        return moves.map((move: any) => Move.fromObject(move));
    }

    async findById(id: number): Promise<Move> {
        
        const move = await prisma.move.findFirst({
            where: { id: id }
        });

        if(!move) throw new Error(`Move with id ${id} not found`);
        return Move.fromObject(move);
    }

    async updateById(updateMoveDto: UpdateMoveDto): Promise<Move> {
        
        await this.findById(updateMoveDto.id);

        const updateMove = await prisma.move.update({
            where: { id: updateMoveDto.id },
            data: {...updateMoveDto.values}
        });

        return Move.fromObject(updateMove);
    }

    async deleteById(id: number): Promise<Move> {
        
        await this.findById(id);

        const deletedMove = await prisma.move.delete({
            where: { id }
        });

        return Move.fromObject(deletedMove);
    }
    
}