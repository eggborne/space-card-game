import GameModeSelectItem from './GameModeSelectItem';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGameModeSelectScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding-bottom: var(--expanded-footer-height);
  padding-top: calc(var(--header-height) + 1rem);
`;

function GameModeSelectScreen(props) {
  return (
    <StyledGameModeSelectScreen style={{ display: props.showing ? 'flex' : 'none' }}>
      <h1 className='section-header'>Select Mode</h1>
      <GameModeSelectItem
        onClick={() => props.switchGameMode('Campaign')}
        selected={props.gameMode === 'Campaign'}
        modeName={'Campaign'}
      />
      <GameModeSelectItem
        onClick={() => props.switchGameMode('Quick Match')}
        selected={props.gameMode === 'Quick Match'}
        modeName={'Quick Match'}
      />
    </StyledGameModeSelectScreen>
  );
}

GameModeSelectScreen.propTypes = {
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
  switchGameMode: PropTypes.func,
};

export default GameModeSelectScreen;