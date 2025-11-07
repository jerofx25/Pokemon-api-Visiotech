
export class UpdatePokemonDto {

  private constructor(
    public readonly id: number,
    public readonly level?: number,
    public readonly name?: string,
    public readonly types?: string[],
    public readonly currentHP?: number,
    public readonly totalHP?: number,
    public readonly baseAttack?: number,
    public readonly baseDefense?: number,
    public readonly baseSpecialAttack?: number,
    public readonly baseSpecialDefense?: number,
    public readonly baseSpeed?: number,
    public readonly moves?: string[], 
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.level !== undefined) returnObj.level = this.level;
    if (this.name !== undefined) returnObj.name = this.name;
    if (this.types !== undefined) returnObj.types = this.types;
    if (this.currentHP !== undefined) returnObj.currentHP = this.currentHP;
    if (this.totalHP !== undefined) returnObj.totalHP = this.totalHP;
    if (this.baseAttack !== undefined) returnObj.baseAttack = this.baseAttack;
    if (this.baseDefense !== undefined) returnObj.baseDefense = this.baseDefense;
    if (this.baseSpecialAttack !== undefined) returnObj.baseSpecialAttack = this.baseSpecialAttack;
    if (this.baseSpecialDefense !== undefined) returnObj.baseSpecialDefense = this.baseSpecialDefense;
    if (this.baseSpeed !== undefined) returnObj.baseSpeed = this.baseSpeed;
    if (this.moves !== undefined) returnObj.moves = this.moves;

    return returnObj;
  }


  static create(props: { [key: string]: any }): [string | undefined, UpdatePokemonDto | undefined] {
    
    const { id, moves, ...rest } = props;

    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number", undefined];
    }

    if (moves && Array.isArray(moves) && moves.length > 4) {
      return ["A Pokémon can only have up to 4 moves", undefined];
    }

    return [undefined, new UpdatePokemonDto(
      Number(id),
      rest.level,
      rest.name,
      rest.types,
      rest.currentHP,
      rest.totalHP,
      rest.baseAttack,
      rest.baseDefense,
      rest.baseSpecialAttack,
      rest.baseSpecialDefense,
      rest.baseSpeed,
      moves,
    )];
  }

}