
import { z } from "zod";

export class RemoveMoveFromPokemonDto {

  static schema = z.object({
    pokemonId: z.number().int().positive("pokemonId must be a valid number"),
    moveId: z.number().int().positive("moveId must be a valid number"),
  });

  private constructor(
    public readonly pokemonId: number,
    public readonly moveId: number,
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, RemoveMoveFromPokemonDto?] {
    
    const parsed = this.schema.safeParse({
      pokemonId: Number(props.pokemonId),
      moveId: Number(props.moveId),
    });

    if (!parsed.success) {
      return [parsed.error.issues[0]?.message];
    }
    
    const { pokemonId, moveId } = props;

    return [undefined, new RemoveMoveFromPokemonDto(
      Number(pokemonId), Number(moveId)
    )];
  }
}