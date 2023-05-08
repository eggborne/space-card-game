import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VersusScreen from './VersusScreen';
import PlayerArea from './PlayerArea';
import PlayerPortrait from '../PlayerPortrait';
import HamburgerMenu from '../HamburgerMenu';
import { pause } from '../../util.js';

const StyledGameScreen = styled.div`
  
  height: var(--game-board-height);
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  overflow: hidden;
`;
  
const GameBoard = styled.div`
  position: absolute;
  height: calc(var(--actual-height) - var(--expanded-footer-height));
  min-width: var(--main-width);
  // background-color: rgb(13, 71, 16);
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  font-weight: bold;
  transition: transform 900ms ease, opacity 700ms ease;
`;

function GameScreen(props) {
  console.log('GameScreen props: ', props);
  
  const [versusScreenShowing, setVersusScreenShowing] = useState(true);
  const [gameBoardShowing, setGameBoardShowing] = useState(false);

  useEffect(() => {
    animate();
  });

  async function animate() {
    document.getElementById('player-area-1').classList.add('onscreen');
    document.getElementById('player-area-2').classList.add('onscreen');
    await pause(1500);
    document.getElementById('versus-screen').classList.add('zoomed-off');
    await pause(300);
    setGameBoardShowing(true);
    await pause(400);
    setVersusScreenShowing(false);
  }

  return (
    <>
      <HamburgerMenu 
        open={props.hamburgerOpen} 
        onClickEndGame={props.onClickEndGame} 
      />

      <StyledGameScreen
        style={{ display: props.showing ? 'flex' : 'none' }}
      >
        <VersusScreen user={props.user} opponent={props.opponent} showing={versusScreenShowing} />
          <GameBoard 
            style={{
              transform: gameBoardShowing ? 'scale(1)' : 'scale(0.5)',
              opacity: gameBoardShowing ? '1' : '0',
            }}
          >
            <PlayerArea 
              playerObject={props.opponent}
              portrait={
                <PlayerPortrait 
                  size='4.5rem'
                  displayName={props.opponent.displayName}
                  imagePath={props.opponent.imagePath}
                  sheetCoords={props.opponent.sheetCoords}
                />
              }
            />
            <PlayerArea 
              playerObject={props.user}
              portrait={
                <PlayerPortrait 
                  size='4.5rem'
                  displayName={props.user.displayName}
                  imagePath={props.user.imagePath}
                  sheetCoords={props.user.sheetCoords}
                />
              }
            />
          </GameBoard>
      </StyledGameScreen>
    </>
  );
}

GameScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  showing: PropTypes.bool,
  hamburgerOpen: PropTypes.bool,
  gameMode: PropTypes.string,
  onClickEndGame: PropTypes.func,
};

export default GameScreen;