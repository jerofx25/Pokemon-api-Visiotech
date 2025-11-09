import { useState, useEffect } from 'react';
import { pokemonService } from '../services/pokemon.service';
import type { Pokemon } from '../types';

export function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getAll();
      setPokemons(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading pokemons');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este Pokémon?')) return;
    
    try {
      await pokemonService.delete(id);
      await loadPokemons();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting pokemon');
    }
  };

  if (loading) return <div>Cargando Pokémons...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="pokemon-list">
      <h2>Lista de Pokémons</h2>
      <button onClick={loadPokemons}>Actualizar</button>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h3>{pokemon.name}</h3>
            <p>Nivel: {pokemon.level}</p>
            <p>Tipo: {pokemon.type}</p>
            <p>HP: {pokemon.currentHp}/{pokemon.totalHp}</p>
            <p>Movimientos: {pokemon.moves.length}/4</p>
            <button onClick={() => handleDelete(pokemon.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

