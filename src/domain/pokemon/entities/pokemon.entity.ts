import { Move } from "../../move/entities/move.entity";


export class Pokemon {

  constructor(
    public readonly id: number,
    public level: number,
    public name: string,
    public type: string, 
    public currentHP: number,
    public totalHP: number,
    public baseAttack: number,
    public baseDefense: number,
    public baseSpecialAttack: number,
    public baseSpecialDefense: number,
    public baseSpeed: number,
    public moves: Move[] = [],
  ) {}

  static fromObject(object: { [key: string]: any }): Pokemon {

    const {
      id,
      level,
      name,
      type,
      currentHp,
      totalHp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
      moves
    } = object;

    if (!id) throw 'Pokemon id is required';
    if (!name) throw 'Pokemon name is required';
    if (!type) throw 'Pokemon type is required';

    return new Pokemon(
      Number(id),
      Number(level),
      name,
      type,
      Number(currentHp),
      Number(totalHp),
      Number(attack),
      Number(defense),
      Number(specialAttack),
      Number(specialDefense),
      Number(speed),
      Array.isArray(moves)
        ? moves.map(m => Move.fromObject(m.move ?? m)) // admite include y raw
        : []
    );
  }
}