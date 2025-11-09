import { useState } from 'react';
import { PokemonList } from './components/PokemonList';
import { BattleStarter } from './components/BattleStarter';
import { BattleView } from './components/BattleView';
import './App.css';

function App() {
  const [currentBattleId, setCurrentBattleId] = useState<number | null>(null);
  const [view, setView] = useState<'pokemons' | 'battle' | 'start'>('pokemons');

  const handleBattleStart = (battleId: number) => {
    setCurrentBattleId(battleId);
    setView('battle');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokémon Battle API</h1>
        <nav className="nav">
          <button onClick={() => setView('pokemons')}>Pokémons</button>
          <button onClick={() => setView('start')}>Nueva Batalla</button>
          {currentBattleId && (
            <button onClick={() => setView('battle')}>Ver Batalla</button>
          )}
        </nav>
      </header>

      <main className="app-main">
        {view === 'pokemons' && <PokemonList />}
        {view === 'start' && <BattleStarter onBattleStart={handleBattleStart} />}
        {view === 'battle' && currentBattleId && (
          <BattleView battleId={currentBattleId} />
        )}
      </main>
    </div>
  );
}

export default App;
