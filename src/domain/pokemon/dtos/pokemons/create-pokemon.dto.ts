

export class CreatePokemonDto {

  private constructor(
    public readonly level: number,
    public readonly name: string,
    public readonly types: string[],
    public readonly currentHP: number,
    public readonly totalHP: number,
    public readonly baseAttack: number,
    public readonly baseDefense: number,
    public readonly baseSpecialAttack: number,
    public readonly baseSpecialDefense: number,
    public readonly baseSpeed: number,
    public readonly moves: string[],
  ) {}

  static create(props: { [key: string]: any }): [string | undefined, CreatePokemonDto | undefined] {

    const {
      level,
      name,
      types,
      currentHP,
      totalHP,
      baseAttack,
      baseDefense,
      baseSpecialAttack,
      baseSpecialDefense,
      baseSpeed,
      moves
    } = props;

    if (!name) return ["Name is required", undefined];
    if (!level) return ["Level is required", undefined];
    if (!types || !Array.isArray(types)) return ["Types must be an array of strings", undefined];
    if (!moves || !Array.isArray(moves)) return ["Moves must be an array of strings", undefined];
    if (moves.length > 4) return ["A Pokémon can only know up to 4 moves", undefined];
    if (currentHP > totalHP) return ["Current HP cannot exceed Total HP", undefined];

    return [undefined, new CreatePokemonDto(
      Number(level),
      String(name),
      types.map(String),
      Number(currentHP),
      Number(totalHP),
      Number(baseAttack),
      Number(baseDefense),
      Number(baseSpecialAttack),
      Number(baseSpecialDefense),
      Number(baseSpeed),
      moves.map(String),
    )];
  }
}