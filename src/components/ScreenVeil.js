import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import PropTypes from 'prop-types';

const StyledScreenVeil = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: var(--actual-height);
  background-color: #000000cc;
  z-index: 2;
  transition: opacity 200ms ease;
`;

function ScreenVeil(props) {
  return (
    <StyledScreenVeil 
      style={{
        opacity: props.showing ? '1' : '0',
        pointerEvents: props.showing ? 'all' : 'none',
      }}
      onClick={props.onClickClose}
    />
  );
}

ScreenVeil.propTypes = {
  showing: PropTypes.bool,
  onClickClose: PropTypes.func,
}

export default ScreenVeil;
