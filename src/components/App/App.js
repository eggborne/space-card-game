import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';
import GameBoard from '../GameBoard/GameBoard';

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

  function handleAcceptGameMode() {
    console.log('gm is', gameMode)
    // if campaign
      // show deck select > opponent select > start
    // if quick match
      // start
    if (gameMode === 'Campaign') {
      
    } else if (gameMode === 'Quick Match') {
      setPhase('game-board-showing')
    }
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
      <GameBoard 
        showing={phase === 'game-board-showing'}

      />
      <Footer 
        phase={phase}
        onClickBackToTitle={() => setPhase('title')}
        onClickAcceptGameMode={handleAcceptGameMode}
      />
    </div>
  );
}

export default App;
