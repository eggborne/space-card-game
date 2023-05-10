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

function PlayerArea(props) {
  const isCPU = !props.playerObject.email;
  return (
    <StyledPlayerArea style={{ flexDirection: isCPU ? 'column-reverse' : 'column'}}>
      <DealArea style={{ flexDirection: isCPU ? 'column' : 'column-reverse'}}>
        <div className='deal-row'>
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
        </div>
        <div className='deal-row'>
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
          <div style={{visibility: 'hidden'}}><Card value={0} /></div>
        </div>
      </DealArea>
      <HandArea 
        style={ isCPU ? {flexDirection: 'row-reverse', paddingRight: `calc(var(--main-padding) * 2)`} : {flexDirection: 'row', paddingLeft: `calc(var(--main-padding) * 2)`} }
      >
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
              <Card value={1} />
              <Card value={3} />
              <Card value={-5} />
              <Card value={6} />
            </>
          }
        </HandCards>
      </HandArea>
    </StyledPlayerArea>
  );
}

PlayerArea.propTypes = {
  playerObject: PropTypes.object,
};

export default PlayerArea;