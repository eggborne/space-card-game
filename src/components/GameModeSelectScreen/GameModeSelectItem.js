import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGameModeSelectItem = styled.div`
  // height: 14rem;
  width: 20rem;
  padding: 2rem 1rem;
  background-color: rgb(50, 51, 93);
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease;
`;

function GameModeSelectItem(props) {
  return (
    <StyledGameModeSelectItem 
    onClick={props.onClick} 
    style={{
      filter: props.selected ? 'none' : 'brightness(75%)',
      scale: props.selected ? '1' : '0.9',
      outline: props.selected ? '0.25rem solid lightgreen' : 'none',
    }}
    >
      <h2>{props.modeName}</h2>
    </StyledGameModeSelectItem>
  );
}

GameModeSelectItem.propTypes = {
  selected: PropTypes.bool,
  modeName: PropTypes.string,
  onClick: PropTypes.func,
};

export default GameModeSelectItem;