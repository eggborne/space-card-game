import PropTypes from 'prop-types';
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
  
  border-radius: var(--card-border-radius);
  
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
  const colorForValue = props.type === 'main' ? 'yellow' : props.value > 0 ? 'blue' : 'red';
  const knobColors = [
    `var(--card-${colorForValue})`,
    `var(--card-${colorForValue})`,
    `var(--card-${colorForValue})`,
  ];
  return (
    <StyledCard
      onClick={props.onClick}
      className={
        props.value ? '' : 'placeholder'
      }
      style={{ 
        width: `calc(var(--card-width) * ${props.scale || 1})`,
        height: `calc(var(--card-height) * ${props.scale || 1})`,
        outline: props.won ? '0.25rem solid green' : 'none',
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
  scale: PropTypes.number,
  won: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;