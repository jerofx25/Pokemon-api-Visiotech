export class AssignMovesToPokemonDto {
  private constructor(
    public readonly pokemonId: number,
    public readonly moveIds: number[],
  ) {}

  static create(props: any): [string | undefined, AssignMovesToPokemonDto?] {
    const { pokemonId, moveIds } = props;

    if (!pokemonId || isNaN(Number(pokemonId))) {
      return ["pokemonId must be a valid number"];
    }

    if (!Array.isArray(moveIds) || moveIds.length === 0) {
      return ["moveIds must be a non-empty array of numbers"];
    }

    if (moveIds.length > 4) {
      return ["A Pokémon can only have up to 4 moves"];
    }

    return [undefined, new AssignMovesToPokemonDto(
      Number(pokemonId),
      moveIds.map((id: any) => Number(id))
    )];
  }
}