

import { Battle } from "../entities/battle.entity";
import { BattleTurn } from "../entities/battle-turn.entity";

export abstract class BattleDatasource {

  abstract startBattle(pokemonAId: number, pokemonBId: number): Promise<Battle>;

  abstract getBattle(battleId: number): Promise<Battle>;

  abstract recordTurn(battleId: number, attackerId: number, moveId: number): Promise<BattleTurn>;

  abstract finishBattle(battleId: number, winnerId: number): Promise<Battle>;
}