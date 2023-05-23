import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import { getAdjustedFontSize } from '../util';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const StyledLoadingIndicator = styled.div`
  --knob-size: calc(var(--loading-indicator-size) / 10);
  width: var(--loading-indicator-size);
  height: var(--loading-indicator-size);
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
  transition: all 500ms ease;
  scale: 0.8;

  & > .loading-legend {
    position: absolute;
    font-family: var(--block-font);
    line-height: 120%;
    text-align: center;
    font-size: calc(var(--loading-indicator-size) / 8);
    animation: bob 750ms ease-in-out alternate infinite;
    color: white;
  }

  & .knob-container {
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: var(--knob-size);
    height: calc(var(--loading-indicator-size) / 2);
    max-height: calc(var(--loading-indicator-size) / 2);
    transform-origin: bottom center;
    animation: spin 750ms linear infinite;
    
    & .load-knob {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--knob-size);
      height: var(--knob-size);
      border-radius: 50%;
      background-color: white;
      // z-index: 3;
      
      &::after, ::before {
        content: '';
        position: absolute;
        width: var(--knob-size);
        height: var(--knob-size);
        border-radius: 50%;
        background-color: white;
        opacity: 0.25;
        translate: calc(var(--knob-size) * 1) calc(var(--knob-size) * 0.12);
        scale: 0.98;
      }

      &::before {
        opacity: 0.125;
        translate: calc(var(--knob-size) * 1.75) calc(var(--knob-size) * 0.8);
        scale: 0.95;

      }
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes bob {
    from {
      scale: 0.65;
    }
    to {
      scale: 1;
    }
  }
`;

function LoadingIndicator(props) {
  console.warn('LoadingIndicator props', props)
  const [knobsCreated, setKnobsCreated] = useState(false);

  useEffect(() => {
    if (props.location !== 'page-load' && !knobsCreated) {
      createKnobs(5);
      setKnobsCreated(true);
    }
  }, [knobsCreated]);

  function createKnobs(knobAmount) {
    for (let i=0; i < knobAmount; i++) {
      console.log('knob', i)
      if (i < (knobAmount - 1)) {
        document.getElementById(`loading-indicator-${props.location}`).innerHTML += `
          <div class='knob-container' style="
            --knob-size: calc((var(--loading-indicator-size) / 2) / ${knobAmount * 2});
            animation-delay: ${i * (100)}ms;
            padding-top: calc(var(--knob-size) * 2 * ${i});
          ">
            <div class='load-knob' style="
              // --knob-size: calc(var(--loading-indicator-size) / ${knobAmount * 2});
            "></div>
          </div>
        `;
      }
    }
  }
  
  return (
    <StyledLoadingIndicator
      id={`loading-indicator-${props.location}`}
      style={{
        scale: props.showing ? 0.8 : 0.5,
        opacity: props.showing ? '1' : '0',
        backgroundColor: props.location === 'page-load' ? 'transparent' : 'black'
      }}
    >
      <h2 className='loading-legend text-shadow'>{props.legend}</h2>
    </StyledLoadingIndicator>
  );
}

LoadingIndicator.propTypes = {
  showing: PropTypes.bool,
  legend: PropTypes.string,
  location: PropTypes.string,
};

export default LoadingIndicator;
