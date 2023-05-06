import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VersusScreen from './VersusScreen';
import { pause } from '../../util.js';

const StyledGameScreen = styled.div`
  height: calc(var(--actual-height) - var(--expanded-footer-height));
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  
  `;
  
  const GameBoard = styled.div`
    position: absolute;
    height: calc(var(--actual-height) - var(--expanded-footer-height));
    min-width: var(--main-width);
    background-color: rgb(13, 71, 16);
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 0 1rem;
    gap: 1rem;
    width: 14rem;
    font-weight: bold;
    transition: transform 900ms ease, opacity 700ms ease;
  `;

// const GameScreenPlayerArea = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   align-items: center;
//   justify-items: center;
//   padding: 0 1rem;
//   gap: 1rem;
//   width: 14rem;
//   font-weight: bold;
// `;

function GameScreen(props) {
  console.log('GameScreen props: ', props);
  
  const [versusScreenShowing, setVersusScreenShowing] = useState(true);

  useEffect(() => {
    console.warn('GameScreen useEffect');
    animate();
  });

  async function animate() {
    document.getElementById('player-area-1').classList.add('onscreen');
    document.getElementById('player-area-2').classList.add('onscreen');
    await pause(1500);
    document.getElementById('versus-screen').classList.add('zoomed-off');
    await pause(500);
    setVersusScreenShowing(false);
  }

  return (
    <StyledGameScreen
      style={{ display: props.showing ? 'flex' : 'none' }}
    >
      <VersusScreen user={props.user} opponent={props.opponent} showing={versusScreenShowing} />
        <GameBoard 
          style={{
            transform: versusScreenShowing ? 'scale(0.5)' : 'scale(1)',
            opacity: versusScreenShowing ? '0' : '1',
          }}
        >
          <div>Opponent area</div>
          <div>Player area</div>
        </GameBoard>
      
    </StyledGameScreen>
  );
}

GameScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
};

export default GameScreen;