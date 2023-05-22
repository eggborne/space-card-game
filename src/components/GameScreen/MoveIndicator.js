import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledMoveIndicator = styled.div`
  --player-area-height: calc((var(--actual-height) - var(--expanded-footer-height)) / 2);
  position: absolute;
  left: 0;
  width: 100%;
  height: var(--player-area-height);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-family: var(--block-font);
  font-size: calc(var(--header-height) / 3);
  scale: 1;
  opacity: 1;
  transition: all 500ms ease;
  pointer-events: none;

  & > h1 {
    transition: all 300ms ease;
  }

  &.hidden {
    scale: 1.1 1;
    opacity: 0;

    & > h1 {
      scale: 1 0.5;
    }
  }
`;

const moveColors = {
  'END TURN': 'var(--move-green)',
  'STAND': 'var(--move-yellow)',
  'BUST :(': 'var(--move-red)',
}

function MoveIndicator(props) {
  const bgColor = moveColors[props.message];

  return (
    <StyledMoveIndicator 
      className={props.showing ? '' : 'hidden'}
      style={{
        top: props.player === 'opponent' ? '0' : 'var(--player-area-height)',
        backgroundColor: bgColor,
      }}
    >
      <h1>{props.message}</h1>
    </StyledMoveIndicator>
  );
}

MoveIndicator.propTypes = {
  showing: PropTypes.bool,
  player: PropTypes.string,
  message: PropTypes.string,
};

export default MoveIndicator;