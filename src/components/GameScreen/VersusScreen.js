import { useEffect } from 'react';
import PlayerPortrait from '../PlayerPortrait';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pause } from '../../util.js';

const StyledVersusScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: var(--expanded-footer-height);
  transition: transform 900ms ease-in, opacity 700ms ease;

  &.zoomed-off {
    transform: translateX(0) scale(8);
    opacity: 0;
  }
`;

const VersusScreenPlayerArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 1rem;
  gap: 1rem;
  width: 14rem;
  font-weight: bold;
  transition: all 500ms ease;

  &:first-of-type {
    transform: translateX(-100%);
    opacity: 0;  
  }
  
  &:last-of-type {
    transform: translateX(100%);
    opacity: 0;
  }

  &.onscreen {
    transform: translateX(0);
    opacity: 1;
  }
`;

async function animate() {
  document.getElementById('player-area-1').classList.add('onscreen');
  document.getElementById('player-area-2').classList.add('onscreen');
  await pause(1600);
  document.getElementById('versus-screen').classList.add('zoomed-off');
}

function VersusScreen(props) {
  
  useEffect(() => {
    animate();
  });

  return (
    <StyledVersusScreen id='versus-screen'
      style={{ display: props.showing ? 'flex' : 'none' }}
    >
      <VersusScreenPlayerArea id='player-area-1'>
        <div>{props.opponent.userName}</div>
        <PlayerPortrait 
          size='6rem'
          imagePath={props.opponent.imagePath}
          sheetCoords={props.opponent.sheetCoords}
        />
      </VersusScreenPlayerArea>
      <h2>VS.</h2>
      <VersusScreenPlayerArea  id='player-area-2'>
        <PlayerPortrait 
          size='6rem'
          imagePath={props.user.imagePath}
          sheetCoords={props.user.sheetCoords}
        />
        <div>{props.user.userName}</div>
      </VersusScreenPlayerArea>
    </StyledVersusScreen>
  );
}

VersusScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  showing: PropTypes.bool,
};

export default VersusScreen;