

import { Pokemon } from "../../pokemon/entities/pokemon.entity";
import { BattleTurn } from "./battle-turn.entity";


export class Battle {

  constructor(
    public readonly id: number,
    public readonly pokemonA: Pokemon,
    public readonly pokemonB: Pokemon,
    public readonly status: string,      // "in_progress" | "finished"
    public readonly winnerId: number | null,
    public readonly turns: BattleTurn[] = [],
  ) {}

  static fromObject(object: { [key: string]: any }): Battle {

    const {
      id,
      pokemonA,
      pokemonB,
      status,
      winnerId,
      turns = [],
      hpA,
      hpB
    } = object;

    if (!id) throw 'Battle id is required';
    if (!pokemonA) throw 'pokemonA is required';
    if (!pokemonB) throw 'pokemonB is required';

    const pokemonAEntity = Pokemon.fromObject(pokemonA);
    const pokemonBEntity = Pokemon.fromObject(pokemonB);

    pokemonAEntity.currentHp = hpA;
    pokemonBEntity.currentHp = hpB;

    return new Battle(
      id,
      pokemonAEntity,
      pokemonBEntity,
      status,
      winnerId,
      Array.isArray(turns)
        ? turns.map(turn => BattleTurn.fromObject(turn))
        : []
    );
  }
}