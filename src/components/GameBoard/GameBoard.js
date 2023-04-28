import './GameBoard.css';
import PropTypes from 'prop-types';

function GameBoard(props) {
  return (
    <div style={{ display: props.showing ? 'flex' : 'none'}} className="GameBoard">
      <div>This is the game board!</div>
    </div>
  );
}

GameBoard.propTypes = {
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
}

export default GameBoard;