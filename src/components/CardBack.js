import styled from 'styled-components';

// main deck: YELLOW 1-10 (4 sets)
// plus cards: BLUE 1-6
// minus cards: RED 1-6

const StyledCardBack = styled.div`
  position: relative;
  background-color: var(--card-white);
  width: var(--card-width);
  height: var(--card-height);
  max-width: calc((var(--main-width) / 5) - (var(--main-padding) * 1.5));
  max-height: var(--card-max-height);
  max-width: var(--card-max-width);
  border-radius: 0.25rem;
  border: 0.1rem solid #00000099;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  
  border-radius: var(--card-border-radius);

  & .arrow-up {
    position: relative;
    width: 0; 
    height: 0; 
    border-left: calc(var(--card-width) / 5) solid transparent;
    border-right: calc(var(--card-width) / 5) solid transparent;
    border-bottom: calc(var(--card-width) / 5) solid #00000000;

    ::after {
      position: absolute;
      content: '';
      top: calc(var(--card-width) / 28);
      right: calc(var(--card-width) / -7);
      width: 0; 
      height: 0; 
      border-left: calc(var(--card-width) / 7) solid transparent;
      border-right: calc(var(--card-width) / 7) solid transparent;
      border-bottom: calc(var(--card-width) / 7) solid var(--card-gray);
    }
  }
  
  & .arrow-down {
    position: relative;
    width: 0; 
    height: 0; 
    border-left: calc(var(--card-width) / 5) solid transparent;
    border-right: calc(var(--card-width) / 5) solid transparent;
    border-top: calc(var(--card-width) / 5) solid #00000000;

    ::after {
      position: absolute;
      content: '';
      bottom: calc(var(--card-width) / 28);
      right: calc(var(--card-width) / -7);
      width: 0; 
      height: 0; 
      border-left: calc(var(--card-width) / 7) solid transparent;
      border-right: calc(var(--card-width) / 7) solid transparent;
      border-top: calc(var(--card-width) / 7) solid var(--card-gray);
    }
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
`;

const CardBackKnob = styled.div`
  position: relative;
  background-color: var(--card-dark-gray);
  border-radius: calc(var(--card-border-radius) / 2);
  border: 0.1rem solid #00000055;
  width: 100%;
  height: 27.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem inset #00000055;

  &.card-back-top {
    height: 60%;
    flex-direction: column;
  }

  &.bottom {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ValueDisplay = styled.div`
  font-weight: bold;
  font-size: calc(var(--card-width) / 4);
  border-radius: calc(var(--card-border-radius) / 4);
  width: 80%;
  scale: 1.05;
  height: 40%;
  background-color: var(--card-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

function CardBack(props) {
  return (
    <StyledCardBack>
      <div className='knob-container'>
        <CardBackKnob className='card-back-top'>
        <div className='arrow-up'></div>
          <ValueDisplay></ValueDisplay>
        <div className='arrow-down'></div>
        </CardBackKnob>
        <CardBackKnob className='bottom'></CardBackKnob>
      </div>
    </StyledCardBack>
  );
}

export default CardBack;