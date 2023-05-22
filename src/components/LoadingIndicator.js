import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import { getAdjustedFontSize } from '../util';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const StyledLoadingIndicator = styled.div`
  --loading-indicator-size: calc(var(--main-width) / 1);
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
  transition: all 1000ms ease;
  scale: 0.8;

  & > .loading-legend {
    font-family: var(--block-font);
    font-size: calc(var(--loading-indicator-size) / 8);
    animation: bob 750ms ease-in-out alternate infinite;
  }

  & > .knob-container {
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
    
    & > .load-knob {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--knob-size);
      height: var(--knob-size);
      border-radius: 50%;
      background-color: white;
      
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

function createKnobs(knobAmount) {
  for (let i=0; i < knobAmount; i++) {
    if (i < (knobAmount - 1)) {
      console.log('creating knob', i)
      document.getElementById('loading-indicator').innerHTML += `
        <div class='knob-container' style="
          --knob-size: calc((var(--loading-indicator-size) / 2) / ${knobAmount * 2});
          animation-delay: ${i * (100)}ms;
          // animation-duration: calc(1000ms + (${i * 10}ms));
          padding-top: calc(var(--knob-size) * 2 * ${i});
        ">
          <div class='load-knob' style="
            --knob-size: calc(var(--loading-indicator-size) / ${knobAmount * 2});
          "></div>
        </div>
      `;
    }
  }
}

function LoadingIndicator(props) {
  const [knobsCreated, setKnobsCreated] = useState(false);

  useEffect(() => {
    if (!knobsCreated) {
      createKnobs(7);
      setKnobsCreated(true);
    }
  }, [knobsCreated]);
  
  return (
    <StyledLoadingIndicator
      id={`loading-indicator`}
      style={{
        scale: props.showing ? 0.8 : 0.5,
        opacity: props.showing ? 1 : 0,
      }}
    >
      <h2 className='loading-legend text-shadow'>LOADING...</h2>
    </StyledLoadingIndicator>
  );
}

LoadingIndicator.propTypes = {
  showing: PropTypes.bool,
};

export default LoadingIndicator;
