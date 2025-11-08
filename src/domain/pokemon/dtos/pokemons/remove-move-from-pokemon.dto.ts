

export class RemoveMoveFromPokemonDto {

  private constructor(
    public readonly pokemonId: number,
    public readonly moveId: number,
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, RemoveMoveFromPokemonDto?] {
    const { pokemonId, moveId } = props;

    if (!pokemonId || isNaN(Number(pokemonId)))
      return ['pokemonId must be a valid number'];

    if (!moveId || isNaN(Number(moveId)))
      return ['moveId must be a valid number'];

    return [undefined, new RemoveMoveFromPokemonDto(Number(pokemonId), Number(moveId))];
  }
}