

import { Move } from "../../move/entities/move.entity";
import { Pokemon } from "../../pokemon/entities/pokemon.entity";

export class BattleTurn {

  constructor(
    public readonly id: number,
    public readonly turnNumber: number,
    public readonly attacker: Pokemon,
    public readonly defender: Pokemon,
    public readonly move: Move,
    public readonly damage: number,
  ) {}

  static fromObject(object: { [key: string]: any }): BattleTurn {

    const { id, turnNumber, attacker, defender, move, damage } = object;

    if (!id) throw 'Turn id is required';

    return new BattleTurn(
      id,
      turnNumber,
      Pokemon.fromObject(attacker),
      Pokemon.fromObject(defender),
      Move.fromObject(move),
      Number(damage)
    );
  }
}