

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
    public readonly hit: boolean,
    public readonly message: string
  ) {}

  static fromObject(object: { [key: string]: any }): BattleTurn {

    const { 
      id, 
      turnNumber, 
      attacker, 
      defender, 
      move, 
      damage, 
      defenderHpAfter,
      attackerHpAfter,
      hit,
      message
    } = object;

    if (!id) throw 'Turn id is required';

    const attackerEntity = Pokemon.fromObject(attacker);
    const defenderEntity = Pokemon.fromObject(defender);

    attackerEntity.currentHp = attackerHpAfter ?? attackerEntity.currentHp;
    defenderEntity.currentHp = defenderHpAfter;

    return new BattleTurn(
      id,
      turnNumber,
      attackerEntity,
      defenderEntity,
      Move.fromObject(move),
      Number(damage),
      hit,
      message
    );
  }
}