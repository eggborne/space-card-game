import Card from '../Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardBack from '../CardBack';

const StyledPlayerArea = styled.div`
  
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  // background-color: #00550066;

  &:first-of-type {
    border-bottom: 0.25rem groove #00000044;
  }
`;

const HandArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--section-height));
  padding-right: calc(var(--main-padding) * 2);

  background-color: #00550044;

  & > .portrait-area, .turn-indicator-area {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }

  .turn-indicator-area {
    width: 3rem;
  }
`;

const HandCards = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  
  & > div {
    transform: scale(0.85);
  }
`;

const DealArea = styled.div`
  flex-grow: 1;
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
  const isCPU = !props.playerObject.email;
  return (
    <StyledPlayerArea style={{ flexDirection: isCPU ? 'column-reverse' : 'column'}}>
      <DealArea>
        <div className='deal-row'>
          <Card type='main' value={1} />
          <Card value={2} />
          <Card value={-2} />
          <Card value={-3} />
          <Card value={0} />
        </div>
        <div className='deal-row'>
          <Card value={5} />
          <Card value={6} />
          <Card value={7} />
          <Card type='main' value={8} />
          <Card value={9} />
        </div>
      </DealArea>
      <HandArea>
        <div className='portrait-area'>{props.portrait}</div>
        <HandCards>
          {isCPU ? 
            <>
              <CardBack />
              <CardBack />
              <CardBack />
              <CardBack />
            </>
            :
            <>
              <Card color='red' value={1} />
              <Card color='red' value={3} />
              <Card color='red' value={-5} />
              <Card color='red' value={6} />
            </>
          }
        </HandCards>
        {/* <div className='turn-indicator-area'>
          <TurnIndicator />  
        </div> */}
      </HandArea>
    </StyledPlayerArea>
  );
}

PlayerArea.propTypes = {
  playerObject: PropTypes.object,
};

export default PlayerArea;