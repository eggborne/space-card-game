import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';
import GameBoard from '../GameScreen/GameScreen';
import styled from 'styled-components';

const StyledApp = styled.main`
  position: relative;
  background-color: #111;
  color: #ddd;
  width: var(--main-width);
  height: var(--actual-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

function App() {
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Quick Match');
  const [user, setUser] = useState({});

  function handleClickLogIn(user) {
    if (user.password) {
      // do user login stuff with user.userName and user.password
    } else {
      // do guest player stuff
      setUser({
        userName: user.userName
      })
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
    <StyledApp >
      <Header 
        userName={user.userName}
      />
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
        onClickBackToGameSelect={() => setPhase('game-mode-select')}
        onClickAcceptGameMode={handleAcceptGameMode}
      />
    </StyledApp>
  );
}

export default App;
