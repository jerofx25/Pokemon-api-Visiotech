import { useState, useEffect } from 'react';
import { pokemonService } from '../services/pokemon.service';
import { battleService } from '../services/battle.service';
import type { Pokemon } from '../types';

interface BattleStarterProps {
  onBattleStart: (battleId: number) => void;
}

export function BattleStarter({ onBattleStart }: BattleStarterProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonAId, setPokemonAId] = useState<number | null>(null);
  const [pokemonBId, setPokemonBId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const data = await pokemonService.getAll();
      setPokemons(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error loading pokemons');
    } finally {
      setLoading(false);
    }
  };

  const handleStartBattle = async () => {
    if (!pokemonAId || !pokemonBId || pokemonAId === pokemonBId) {
      alert('Selecciona dos Pokémons diferentes');
      return;
    }

    try {
      setStarting(true);
      const battle = await battleService.start(pokemonAId, pokemonBId);
      onBattleStart(battle.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error starting battle');
    } finally {
      setStarting(false);
    }
  };

  if (loading) return <div>Cargando Pokémons...</div>;

  return (
    <div className="battle-starter">
      <h2>Iniciar Batalla</h2>
      <div className="pokemon-selectors">
        <div>
          <label>Pokémon A:</label>
          <select 
            value={pokemonAId || ''} 
            onChange={(e) => setPokemonAId(Number(e.target.value))}
          >
            <option value="">Selecciona un Pokémon</option>
            {pokemons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Lv.{p.level}) - HP: {p.currentHp}/{p.totalHp}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Pokémon B:</label>
          <select 
            value={pokemonBId || ''} 
            onChange={(e) => setPokemonBId(Number(e.target.value))}
          >
            <option value="">Selecciona un Pokémon</option>
            {pokemons.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Lv.{p.level}) - HP: {p.currentHp}/{p.totalHp}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        onClick={handleStartBattle} 
        disabled={starting || !pokemonAId || !pokemonBId || pokemonAId === pokemonBId}
      >
        {starting ? 'Iniciando...' : 'Iniciar Batalla'}
      </button>
    </div>
  );
}

