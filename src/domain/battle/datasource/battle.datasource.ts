

import { Battle } from "../entities/battle.entity";

export abstract class BattleDatasource {

  abstract startBattle(pokemonAId: number, pokemonBId: number): Promise<Battle>;

  abstract getBattle(battleId: number): Promise<Battle>;

  abstract recordTurn(battleId: number, attackerId: number, moveId: number): Promise<Battle>;

  abstract finishBattle(battleId: number, winnerId: number): Promise<Battle>;
}