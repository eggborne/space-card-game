import { useState } from 'react';
import Card from '../Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardBack from '../CardBack';
import ScoreArea from './ScoreArea';
import { v4 } from 'uuid'

const StyledPlayerArea = styled.div`
  
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  &:first-of-type {
    border-bottom: 0.25rem groove #00000044;
  }

  & .current-turn {
    animation: pulse infinite alternate 600ms ease;
  }

  @keyframes pulse {
    from {
      background-color: #00ff0022;
    }
    to {
      background-color: #00ff0055;
    }
  }
`;

const HandArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--section-height));
  
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
    transform: scale(0.9);
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
    
    & .score-area {
      align-self: stretch;
      height: 100%;
      outline: 1px solid orange;
    }
  }
`;

function PlayerArea(props) {
  console.warn('PlayerArea props', props);

  const [selectedCard, setSelectedCard] = useState(undefined);

  const isCPU = !props.playerObject.email;

  const firstDealRow = [...props.playerStatus.cardsInPlay];
  const emptyFirstRowSpaces = 4 - firstDealRow.length;
  for (let i = 0; i < emptyFirstRowSpaces; i++) {
    firstDealRow.push({ id: v4(), value: 0, type: 'main' });
  }
  const secondDealRow = [];
  const emptySecondRowSpaces = 5 - secondDealRow.length;


  console.log(firstDealRow);

  return (
    <StyledPlayerArea
      style={{
        flexDirection: isCPU ? 'column-reverse' : 'column',
      }}
    >
      <DealArea style={{ flexDirection: isCPU ? 'column' : 'column-reverse' }}>
        <div className='deal-row'>
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
          <Card value={0} />
        </div>
        <div className='deal-row'>
          {firstDealRow.map(cardData =>
            <Card key={cardData.id} value={cardData.value} type='main' />
          )}
          <ScoreArea playerObject={props.playerObject} playerStatus={props.playerStatus} />
        </div>
      </DealArea>
      <HandArea
        className={props.isTurn ? 'current-turn' : ''} style={isCPU ? { flexDirection: 'row-reverse', paddingRight: `calc(var(--main-padding) * 2)` } : { flexDirection: 'row', paddingLeft: `calc(var(--main-padding) * 2)` }}
      >
        <div className='portrait-area'>{props.portrait}</div>
        <HandCards>
          {isCPU ?
            <>
              {/* <CardBack />
              <CardBack />
              <CardBack />
              <CardBack /> */}
              {Object.values(props.playerStatus.hand).map(card => // for testing
                <Card key={card.id} value={card.value} />
              )}
            </>
            :
            <>
              {Object.values(props.playerStatus.hand).map(card =>
                <Card
                  key={card.id}
                  value={card.value}
                  selected={card === selectedCard}
                  onClick={() => setSelectedCard(selectedCard === card ? undefined : card)}
                />
              )}
            </>
          }
        </HandCards>
      </HandArea>
    </StyledPlayerArea>
  );
}

PlayerArea.propTypes = {
  playerObject: PropTypes.object,
  playerStatus: PropTypes.object,
  isTurn: PropTypes.bool,
};

export default PlayerArea;