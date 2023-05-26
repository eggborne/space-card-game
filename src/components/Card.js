import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// main deck: YELLOW 1-10 (4 sets)
// plus cards: BLUE 1-6
// minus cards: RED 1-6

const StyledCard = styled.div`
  position: relative;
  background-color: var(--card-white);
  width: var(--card-width);
  height: var(--card-height);
  max-width: calc((var(--main-width) / 5) - (var(--main-padding) * 1.5));
  max-height: var(--card-max-height);
  max-width: var(--card-max-width);
  border: 0.1rem solid #00000099;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  z-index: 0;
  transform-origin: 50% 30%;
  opacity: 0.2;
  transition: all 200ms ease;
  
  border-radius: var(--card-border-radius);

  &.flipped {
    opacity: 1;
  }
  
  & > .knob-container {
    padding: var(--card-padding);
    padding-bottom: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &.placeholder {
    background-color: #ffffff27;
    
    & > .knob-container {
      display: none;
    }
  }

  @keyframes flash-space {
    from {
      border: 0.25rem solid #00ff0022;
      background-color: transparent;
    }
    to {
      border: 0.25rem solid #00ff0099;
      background-color: #00ff00aa;
    }
  }

`;

const CardKnob = styled.div`
  position: relative;
  border-radius: calc(var(--card-border-radius) / 2);
  width: 100%;
  height: 27.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem inset #00000055;
  --arrow-outer-size: calc(var(--card-height) / 8);
  --arrow-inner-size: calc(var(--card-height) / 12);

  &.bottom {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ValueDisplay = styled.div`
  font-weight: bold;
  // font-size: calc(var(--card-height) / 5);
  font-size: calc(var(--card-width) / 4);
  position: absolute;
  border-radius: calc(var(--card-border-radius) / 4);
  transform: translateY(-50%);
  top: calc(36%);
  width: 65%;
  height: 25%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 0.1rem inset #ffffff99;
  z-index: 1;
`;

function Card(props) {
  const [flipped, setFlipped] = useState(false);
  const colorForValue = props.type === 'main' ? 'yellow' : props.value > 0 ? 'blue' : 'red';
  const knobColors = [
    `var(--card-${colorForValue})`,
    `var(--card-${colorForValue})`,
    `var(--card-${colorForValue})`,
  ];

  useEffect(() =>{
    if (props.value && !flipped) {
      setFlipped(true);
    }
  }, [flipped]);
  return (
    <StyledCard
      onClick={props.onClick}
      className={
        props.value ? flipped ? 'flipped' : '' : 'placeholder'
      }
      style={{ 
        width: `calc(var(--card-width) * ${props.scale || 1})`,
        height: `calc(var(--card-height) * ${props.scale || 1})`,
        outline: props.won ? '0.25rem solid green' : 'none',
        scale: props.selected ? '1.1' : flipped ? '1' : !props.value ? '1' : '1.35',
        boxShadow: props.selected ? '0 0 1rem 0.5rem #00000077' : 'none',
        zIndex: props.selected ? '2' : '1',
        animation: props.usableSpace ? 'flash-space infinite alternate 750ms ease' : 'none'
      }}
    >
      <div className='knob-container'>
        <CardKnob style={{ backgroundColor: knobColors[0] }}>
          <div className='arrow-up'></div>
        </CardKnob>
        <ValueDisplay>{props.value}</ValueDisplay>
        <CardKnob style={{ backgroundColor: knobColors[1] }}>
          <div className='arrow-down'></div>
        </CardKnob>
        <CardKnob className='bottom' style={{ backgroundColor: knobColors[2] }}></CardKnob>
      </div>
    </StyledCard>
  );
}

Card.propTypes = {
  value: PropTypes.number,
  selected: PropTypes.bool,
  usableSpace: PropTypes.bool,
  scale: PropTypes.number,
  won: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;