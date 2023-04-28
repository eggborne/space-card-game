import GameModeSelectItem from './GameModeSelectItem';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGameModeSelectScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  background-color: rgb(145, 150, 105);
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding-bottom: var(--expanded-footer-height);
`;

function GameModeSelectScreen(props) {
  return (
    <StyledGameModeSelectScreen style={{ display: props.showing ? 'flex' : 'none'}}>
      <h1 className='section-header'>Game Mode</h1>
      <GameModeSelectItem onClick={() => props.switchGameMode('Campaign')} selected={props.gameMode === 'Campaign' } modeName={'Campaign'} />
      <GameModeSelectItem onClick={() => props.switchGameMode('Quick Match')} selected={props.gameMode === 'Quick Match' } modeName={'Quick Match'} />
    </StyledGameModeSelectScreen>
  );
}

GameModeSelectScreen.propTypes = {
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
  switchGameMode: PropTypes.func,
}

export default GameModeSelectScreen;