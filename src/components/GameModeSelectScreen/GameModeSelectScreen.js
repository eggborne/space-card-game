import './GameModeSelectScreen.css';
import Button from '../Button/Button';
import LoginArea from '../LoginArea/LoginArea';
import PropTypes from 'prop-types';

function GameModeSelectScreen(props) {
  return (
    <div style={{ display: props.showing ? 'grid' : 'none'}} className="GameModeSelectScreen">
      BLEEARRGHH, I am a Game Mode Select Screen
    </div>
  );
}

GameModeSelectScreen.propTypes = {
  showing: PropTypes.bool,
}

export default GameModeSelectScreen;