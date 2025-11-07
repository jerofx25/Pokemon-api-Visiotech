import { prisma } from "../../../data/postgres";
import { PokemonDatasource } from "../../../domain/pokemon/datasource/pokemon.datasource";
import { CreatePokemonDto, UpdatePokemonDto } from "../../../domain/pokemon/dtos";
import { Pokemon } from "../../../domain/pokemon/entities/pokemon.entity";



export class PostgresPokemonDatasource implements PokemonDatasource {

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {

        const {moves, ...pokemonData} = createPokemonDto;
        
        const pokemon = await prisma.pokemon.create({
            data: {
                ...createPokemonDto,
                moves: {
                    create: moves.map(m => ({moveId: m.id}) )
                }
            }
        });

        return Pokemon.fromObject(pokemon);
    }

    async findAll(): Promise<Pokemon[]> {
        
        const pokemons =  await prisma.pokemon.findMany({
            include: {
                moves: {
                    include: {
                        move: true
                    }
                }
            }
        });

        return pokemons.map(Pokemon.fromObject);
    }

    async findById(id: number): Promise<Pokemon> {
        
        const pokemon = await prisma.pokemon.findFirst({
            where: { id },
            include: { moves: { include: { move: true } } }
        });

        if (!pokemon) throw new Error(`Pokemon with id ${id} not found`);

        return Pokemon.fromObject(pokemon);

    }

    async updateById(updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
        
        const { id, moves, ...data } = updatePokemonDto.values;

        await this.findById(updatePokemonDto.id);

        const updated = await prisma.pokemon.update({
            where: { id: updatePokemonDto.id },
            data: { ...data },
            include: { moves: { include: { move: true } } }
        });

        return Pokemon.fromObject(updated);
    }

    async deleteById(id: number): Promise<Pokemon> {
        
        await this.findById(id);

        const deleted = await prisma.pokemon.delete({
            where: { id },
            include: { moves: { include: { move: true } } }
        });

        return Pokemon.fromObject(deleted);
    }

}