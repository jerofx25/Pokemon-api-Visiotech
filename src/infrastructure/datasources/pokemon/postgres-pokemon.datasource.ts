import { prisma } from "../../../data/postgres";
import { PokemonDatasource } from "../../../domain/pokemon/datasource/pokemon.datasource";
import { CreatePokemonDto, UpdatePokemonDto } from "../../../domain/pokemon/dtos";
import { AssignMovesToPokemonDto } from "../../../domain/pokemon/dtos/pokemons/assign-moves-to-pokemon.dto";
import { RemoveMoveFromPokemonDto } from "../../../domain/pokemon/dtos/pokemons/remove-move-from-pokemon.dto";
import { Pokemon } from "../../../domain/pokemon/entities/pokemon.entity";



export class PostgresPokemonDatasource implements PokemonDatasource {

    async removeMove(removeMoveFromPokemon: RemoveMoveFromPokemonDto): Promise<Pokemon> {
      
      const {pokemonId, moveId} = removeMoveFromPokemon;

      const exists = await prisma.pokemonMove.findFirst({
        where: { pokemonId, moveId }
      });

      if (!exists) throw new Error(`Pokemon does not have move ${moveId}`);

      await prisma.pokemonMove.delete({
        where: { id: exists.id }
      });

      const updated = await prisma.pokemon.findUnique({
        where: { id: pokemonId },
        include: { moves: { include: { move: true } } }
      });

      return Pokemon.fromObject(updated!);
      
    };

    async assignMoves(assignMovesToPokemonDto: AssignMovesToPokemonDto): Promise<Pokemon> {

      const pokemon = await prisma.pokemon.findUnique({ where: { id: assignMovesToPokemonDto.pokemonId }});
      if (!pokemon) throw new Error(`Pokemon with id ${assignMovesToPokemonDto.pokemonId} not found`);

      const moves = await prisma.move.findMany({
        where: { id: { in: assignMovesToPokemonDto.moveIds }}
      });
      if (moves.length !== assignMovesToPokemonDto.moveIds.length) {
        throw new Error(`Some moves do not exist`);
      }

      const current = await prisma.pokemonMove.count({
        where: { pokemonId: assignMovesToPokemonDto.pokemonId }
      });
      if (current + assignMovesToPokemonDto.moveIds.length > 4) {
        throw new Error(`Pokemon can only have 4 moves`);
      }

    await prisma.pokemonMove.createMany({
      data: moves.map(move => ({
        pokemonId: assignMovesToPokemonDto.pokemonId,
        moveId: move.id,
        pp: move.pp 
      }))
    });

    const updated = await prisma.pokemon.findUnique({
      where: { id: assignMovesToPokemonDto.pokemonId },
      include: { moves: { include: { move: true }}}
    });

      return Pokemon.fromObject(updated!);
    }

    async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {

      const{moveIds, ...pokemonData} = createPokemonDto;

      const pokemon = await prisma.pokemon.create({
          data: pokemonData,
      });

      if (moveIds.length > 0) {
        await prisma.pokemonMove.createMany({
          data: moveIds.map(moveId => ({
            pokemonId: pokemon.id,
            moveId
          }))
        });
      }

      const createdPokemon = await prisma.pokemon.findUnique({
        where: { id: pokemon.id },
        include: { moves: { include: { move: true } } }
      });

        return Pokemon.fromObject(createdPokemon!);
    };

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