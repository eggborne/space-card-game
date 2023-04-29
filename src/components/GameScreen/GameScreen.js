import PlayerPortrait from '../PlayerPortrait';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGameBoard = styled.div`
  padding: 1rem;
  align-self: stretch;
  background-color: rgb(13, 71, 16);
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: var(--expanded-footer-height);
`;

const GameBoardPlayerArea = styled.div`
  display: flex;
  align-items: center;
  gap:0.5rem;
  width: 16rem;
  font-weight: bold;
`;

function GameScreen(props) {
  console.log('GameScreen', props);
  return (
    <StyledGameBoard
      style={{ display: props.showing ? 'flex' : 'none' }}
    >
      <GameBoardPlayerArea>
        <div>{props.opponent.userName}</div>
        <PlayerPortrait 
          size='6rem'
          imagePath={props.opponent.imagePath}
          sheetCoords={props.opponent.sheetCoords}
        />
      </GameBoardPlayerArea>
      <h2>VS.</h2>
      <GameBoardPlayerArea>
        <PlayerPortrait 
          size='6rem'
          imagePath={props.user.imagePath}
          sheetCoords={props.user.sheetCoords}
        />
        <div>{props.user.userName}</div>
      </GameBoardPlayerArea>
    </StyledGameBoard>
  );
}

GameScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
};

export default GameScreen;