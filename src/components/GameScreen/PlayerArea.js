import Card from '../Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPlayerArea = styled.div`
  --main-padding: 0.25rem;
  --section-height: calc((var(--total-height) / 6));
  --card-x-space: calc(var(--main-width) - (var(--section-height) * 1.5));
  --card-height: calc(var(--section-height) - (var(--main-padding) * 3));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:first-of-type {
    border-bottom: 0.25rem groove #00000044;
  }
`;

const HandArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--section-height);
  padding: 0 var(--main-padding);
  background-color: orange;
  padding: var(--main-padding);

  & > .portrait-area, .turn-indicator-area {
    width: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .turn-indicator-area {
    width: 4rem;
  }

`;

const HandCards = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: calc(var(--main-padding) * 0.75);

  & > div {
    --card-height: calc(var(--section-height) * 0.7);
  }
`;

const DealArea = styled.div`
  height: calc(var(--section-height) * 2);
  background-color: darkblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--main-padding);
  padding: var(--main-padding);

  & .deal-row {
    display: flex;
    gap: var(--main-padding);
  }

`;

const TurnIndicator = styled.div`
  border-radius: 50%;
  background-color: red;
  border: 0.1rem solid #00000088;
  width: calc(var(--section-height) / 3);
  height: calc(var(--section-height) / 3);
`;

function PlayerArea(props) {

  return (
    <StyledPlayerArea style={{ flexDirection: props.playerObject.email ? 'column' : 'column-reverse'}}>
      <DealArea>
        <div className='deal-row'>
          <Card value={1} />
          <Card value={2} />
          <Card value={3} />
          <Card value={4} />
          <Card value={5} />
        </div>
        <div className='deal-row'>
          <Card value={6} />
          <Card value={7} />
          <Card value={8} />
          <Card value={9} />
          <Card value={0} />
        </div>
      </DealArea>
      <HandArea>
        <div className='portrait-area'>{props.portrait}</div>
        <HandCards>
          <Card value={1} />
          <Card value={3} />
          <Card value={-5} />
          <Card value={6} />
        </HandCards>
        <div className='turn-indicator-area'>
          <TurnIndicator />  
        </div>
      </HandArea>
    </StyledPlayerArea>
  );
}

PlayerArea.propTypes = {
  playerObject: PropTypes.object,
};

export default PlayerArea;