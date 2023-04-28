import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';

function App() {
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Quick Match');

  function handleClickLogIn(user) {
    if (user.password) {
      // do user log in stuff
    } else {
      // do guest player stuff
      setPhase('game-mode-select');
    }
  }

  function handleSwitchGameMode(newMode) {
    setGameMode(newMode);
  }

  return (
    <div className="App">
      <Header />
      <TitleScreen 
        showing={phase === 'title'}
        handleClickLogIn={handleClickLogIn}
      />
      <GameModeSelectScreen 
        showing={phase === 'game-mode-select'}
        gameMode={gameMode}
        switchGameMode={handleSwitchGameMode}
      />
      <Footer phase={phase} />
    </div>
  );
}

export default App;
