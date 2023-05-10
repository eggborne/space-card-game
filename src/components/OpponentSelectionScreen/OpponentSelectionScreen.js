import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOpponentSelectionScreen = styled.div`
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

function OpponentSelectionScreen(props) {
  return (
    <StyledOpponentSelectionScreen style={{ display: props.showing ? 'flex' : 'none' }}>
      <h1 className='section-header'>Choose Opponent</h1>
      <div>stuff inside the opponent selection screen</div>
    </StyledOpponentSelectionScreen>
  );
}

OpponentSelectionScreen.propTypes = {
  showing: PropTypes.bool,
  characters: PropTypes.object,
  onClickConfirmOpponent: PropTypes.func,
};

export default OpponentSelectionScreen;