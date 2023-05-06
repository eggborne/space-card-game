import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VersusScreen from './VersusScreen';

const StyledGameScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  // background-color: rgb(13, 71, 16);
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: var(--expanded-footer-height);
`;

const GameScreenPlayerArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 1rem;
  gap: 1rem;
  width: 14rem;
  font-weight: bold;
`;

function GameScreen(props) {
  console.log('GameScreen props: ', props);
  const [versusScreenShowing, setVersusScreenShowing] = useState(true)
  return (
    <StyledGameScreen
      style={{ display: props.showing ? 'flex' : 'none' }}
    >
      <VersusScreen user={props.user} opponent={props.opponent} showing={versusScreenShowing} />
      {!versusScreenShowing &&
        <div>this is the actual game board</div>
      }
      
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