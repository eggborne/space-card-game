import './GameModeSelectItem.css';
import PropTypes from 'prop-types';

function GameModeSelectItem(props) {
  return (
    <div onClick={props.onClick} style={{ 
        opacity: props.selected ? '1' : '0.5',
        scale: props.selected ? '1' : '0.9',
        outline: props.selected ? '0.25rem solid lightgreen' : 'none',
      }} 
      className="GameModeSelectItem"
    >
      <h2>{props.modeName}</h2>
    </div>
  );
}

GameModeSelectItem.propTypes = {
  selected: PropTypes.bool,
  modeName: PropTypes.string,
  onClick: PropTypes.func,
}

export default GameModeSelectItem;