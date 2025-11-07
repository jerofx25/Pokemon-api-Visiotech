

export class Pokemon {

  constructor(
    public readonly id: number,
    public level: number,
    public name: string,
    public types: string[], 
    public currentHP: number,
    public totalHP: number,
    public baseAttack: number,
    public baseDefense: number,
    public baseSpecialAttack: number,
    public baseSpecialDefense: number,
    public baseSpeed: number,
    public moves: string[], // máximo 4 movimientos
  ) {

    if (moves.length > 4) {
      throw new Error("A Pokémon can only learn up to 4 moves.");
    }

    if (currentHP > totalHP) {
      throw new Error("Current HP cannot exceed Total HP.");
    }
  }
}