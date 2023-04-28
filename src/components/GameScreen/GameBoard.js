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

function GameBoard(props) {
  return (
    <StyledGameBoard style={{ display: props.showing ? 'flex' : 'none'}} className="GameBoard">
      <div>This is the game board!</div>
    </StyledGameBoard>
  );
}

GameBoard.propTypes = {
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
}

export default GameBoard;