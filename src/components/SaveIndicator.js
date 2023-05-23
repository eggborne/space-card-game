import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSaveIndicator = styled.div`
  // width: var(--main-width);
  padding: 0.75rem 2rem;
  position: absolute;
  left: 50%;
  top: calc(var(--header-height) + 0.75rem);
  translate: -50% -50%;
  background-color: var(--button-green);
  border-radius: calc(var(--border-radius) / 2);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 1;
  z-index: 2;
  transition: all 200ms ease;
  
  &.hidden {
    opacity: 0;
    translate: -50% -150%;
  }

  & > .legend {
    font-family: var(--regular-font);
    line-height: 120%;
    text-align: center;
    font-size: calc(var(--header-height) / 3);
    color: white;
  }

`;

function SaveIndicator(props) {
  console.warn('SaveIndicator props', props);
  return (
    <StyledSaveIndicator
      className={props.showing ? '' : 'hidden'}
      // style={{
      //   scale: props.showing ? '1 1' : '1 0.5',
      //   opacity: props.showing ? '1' : '0',
      // }}
    >
      <h2 className='legend text-shadow'>{props.legend}</h2>
    </StyledSaveIndicator>
  );
}

SaveIndicator.propTypes = {
  showing: PropTypes.bool,
  legend: PropTypes.string,
  location: PropTypes.string,
};

export default SaveIndicator;
