import { BattleDatasource } from "../../../domain/battle/datasource/battle.datasource";
import { BattleTurn } from "../../../domain/battle/entities/battle-turn.entity";
import { Battle } from "../../../domain/battle/entities/battle.entity";
import { BattleRepository } from "../../../domain/battle/repository/battle.repository";


export class BattleRepositoryImpl implements BattleRepository {

    constructor(
        private readonly datasource: BattleDatasource,
    ){}

    startBattle(pokemonAId: number, pokemonBId: number): Promise<Battle> {
        return this.datasource.startBattle(pokemonAId, pokemonBId);
    }
    getBattle(battleId: number): Promise<Battle> {
        return this.datasource.getBattle(battleId);
    }
    recordTurn(battleId: number, attackerId: number, moveId: number): Promise<Battle> {
        return this.datasource.recordTurn(battleId, attackerId, moveId);
    }
    finishBattle(battleId: number, winnerId: number): Promise<Battle> {
        return this.datasource.finishBattle(battleId, winnerId);
    }

}