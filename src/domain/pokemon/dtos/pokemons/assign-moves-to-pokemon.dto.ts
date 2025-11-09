
import { z } from "zod";

export class AssignMovesToPokemonDto {

  static schema = z.object({
    pokemonId: z.number().int().positive("pokemonId must be a valid number"),
    moveIds: z.array(z.number().int().positive("moveIds must be valid numbers"))
      .min(1, "moveIds must contain at least 1 move")
      .max(4, "A Pokémon can only have up to 4 moves"),
  })

  private constructor(
    public readonly pokemonId: number,
    public readonly moveIds: number[],
  ) {}

  static create(props: any): [string | undefined, AssignMovesToPokemonDto?] {
    
    const parsed = this.schema.safeParse({
      pokemonId: Number(props.pokemonId),
      moveIds: props.moveIds?.map((id: any) => Number(id))
    });

    if (!parsed.success) {
      return [parsed.error.issues[0]?.message];
    }
    
    const { pokemonId, moveIds } = props;

    return [undefined, new AssignMovesToPokemonDto(
      pokemonId,
      moveIds
    )];
  }
}