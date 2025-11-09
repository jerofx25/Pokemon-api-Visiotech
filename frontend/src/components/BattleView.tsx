import { useState, useEffect } from 'react';
import { battleService } from '../services/battle.service';
import type { Battle } from '../types';

interface BattleViewProps {
  battleId: number;
}

export function BattleView({ battleId }: BattleViewProps) {
  const [battle, setBattle] = useState<Battle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    loadBattle();
    const interval = setInterval(loadBattle, 2000);
    return () => clearInterval(interval);
  }, [battleId]);

  const loadBattle = async () => {
    try {
      const data = await battleService.getById(battleId);
      setBattle(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading battle');
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteTurn = async () => {
    if (!battle || battle.status === 'finished') return;
    
    try {
      setExecuting(true);
      const updated = await battleService.executeTurn(battleId);
      setBattle(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error executing turn');
    } finally {
      setExecuting(false);
    }
  };

  if (loading) return <div>Cargando batalla...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!battle) return <div>Batalla no encontrada</div>;

  const isFinished = battle.status === 'finished';

  return (
    <div className="battle-view">
      <h2>Batalla #{battle.id}</h2>
      <div className="battle-status">
        <p>Estado: {battle.status}</p>
        {isFinished && battle.winnerId && (
          <p className="winner">Ganador: {battle.winnerId === battle.pokemonA.id ? battle.pokemonA.name : battle.pokemonB.name}</p>
        )}
      </div>
      
      <div className="battle-pokemons">
        <div className="pokemon-battle-card">
          <h3>{battle.pokemonA.name}</h3>
          <p>HP: {battle.pokemonA.currentHp}/{battle.pokemonA.totalHp}</p>
          <div className="hp-bar">
            <div 
              className="hp-fill" 
              style={{ width: `${(battle.pokemonA.currentHp / battle.pokemonA.totalHp) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="vs">VS</div>
        
        <div className="pokemon-battle-card">
          <h3>{battle.pokemonB.name}</h3>
          <p>HP: {battle.pokemonB.currentHp}/{battle.pokemonB.totalHp}</p>
          <div className="hp-bar">
            <div 
              className="hp-fill" 
              style={{ width: `${(battle.pokemonB.currentHp / battle.pokemonB.totalHp) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!isFinished && (
        <button 
          onClick={handleExecuteTurn} 
          disabled={executing}
          className="execute-turn-btn"
        >
          {executing ? 'Ejecutando turno...' : 'Ejecutar Turno'}
        </button>
      )}

      <div className="battle-turns">
        <h3>Historial de Turnos</h3>
        {battle.turns.map((turn) => (
          <div key={turn.id} className="turn-item">
            <p><strong>Turno {turn.turnNumber}:</strong> {turn.message}</p>
            <p>Daño: {turn.damage} | Acierto: {turn.hit ? 'Sí' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

