import './GameModeSelectScreen.css';
import GameModeSelectItem from '../GameModeSelectItem/GameModeSelectItem';
import PropTypes from 'prop-types';

function GameModeSelectScreen(props) {
  return (
    <div style={{ display: props.showing ? 'flex' : 'none'}} className="GameModeSelectScreen">
      <h1 className='section-header'>Game Mode</h1>
      <GameModeSelectItem onClick={() => props.switchGameMode('Campaign')} selected={props.gameMode === 'Campaign' } modeName={'Campaign'} />
      <GameModeSelectItem onClick={() => props.switchGameMode('Quick Match')} selected={props.gameMode === 'Quick Match' } modeName={'Quick Match'} />
    </div>
  );
}

GameModeSelectScreen.propTypes = {
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
  switchGameMode: PropTypes.func,
}

export default GameModeSelectScreen;