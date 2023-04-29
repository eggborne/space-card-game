import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';
import GameScreen from '../GameScreen/GameScreen';
import styled from 'styled-components';
import { characters, randomOpponents } from '../../characters.js';

console.warn('got characters')
console.table(characters)
console.warn('got randomOpponents')
console.table(randomOpponents)

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
  background-image: url(images/starfield.png);
  background-size: cover;
  background-position: center;
`;

function App() {
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Quick Match');
  const [user, setUser] = useState({
    userName: '',
    guest: true,
  });
  const [opponent, setOpponent] = useState({
    userName: '',
    imagePath: 'images/opponentsheet.jpg',
    sheetCoords: { x: randomInt(0, 7), y: randomInt(0, 2) },
  });
  const [avatarChoiceModalShowing, setAvatarChoiceModalShowing] = useState(false);

  function handleClickLogIn(user) {
    console.warn('handleClickLogin got user')
    console.table(user)
    if (user.password) {
      // do user login stuff with user.userName and user.password
    } else {
      setUser({
        userName: user.userName,
        imagePath: 'images/avatarsheetlq.jpg',
        // sheetCoords: { x: randomInt(0, 7), y: randomInt(0, 2) },
      });

      setAvatarChoiceModalShowing(true);
    }
  }
  
  function handleChooseAvatar(newSheetCoords) {
    setUser({
      userName: user.userName,
      imagePath: 'images/avatarsheetlq.jpg',
      sheetCoords: newSheetCoords,
    });
    setAvatarChoiceModalShowing(false);
    setPhase('game-mode-select');
  }

  function handleSwitchGameMode(newMode) {
    setGameMode(newMode);
  }

  function handleAcceptGameMode() {
    if (gameMode === 'Campaign') {
      
    } else if (gameMode === 'Quick Match') {
      let randomX = randomInt(0, 5);
      let characterData = Object.values(randomOpponents)[randomX];
      console.log('got data', characterData)
      setOpponent({
        ...characterData,
        imagePath: 'images/opponentsheet.jpg',
        sheetCoords: { x: randomX, y: 3 },
      });
      setPhase('game-board-showing');
    }
  }

  function handleCloseAvatarModal() {
    setAvatarChoiceModalShowing(false);
  }


  return (
    <StyledApp >
      <Header 
        userName={user.userName}
        imagePath={user.imagePath}
        sheetCoords={user.sheetCoords}
        phase={phase}
      />
      <TitleScreen 
        showing={phase === 'title'}
        handleClickLogIn={handleClickLogIn}
        handleChooseAvatar={handleChooseAvatar}
        avatarChoiceModalShowing={avatarChoiceModalShowing}
        handleCloseAvatarModal={handleCloseAvatarModal}
      />
      <GameModeSelectScreen 
        showing={phase === 'game-mode-select'}
        gameMode={gameMode}
        switchGameMode={handleSwitchGameMode}
      />
      {phase === 'game-board-showing' && <GameScreen 
        showing={phase === 'game-board-showing'}
        user={{...user}}
        opponent={{...opponent}}
      />}
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
