import { useState } from 'react';
import Card from '../Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardBack from '../CardBack';
import ScoreArea from './ScoreArea';
import { v4 } from 'uuid';

const StyledPlayerArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;

  &:first-of-type {
    border-bottom: 0.25rem groove #00ff0066;
  }

  & .current-turn {
    animation: pulse infinite alternate 600ms ease;
    border-radius: calc(var(--border-radius) / 6);
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

const StyledCardBack = styled(CardBack)`
  scale: 0.5 !important;
  position: fixed !important;
  top: 0;
  left: 0;
  outline: 2px solid blue;
`;

function PlayerArea(props) {
  console.warn('PlayerArea props', props);

  const [selectedCard, setSelectedCard] = useState(undefined);

  const isCPU = !props.playerObject.email; // not ideal but the easiest way to check for now

  // create hand array
  const playerHand = [...props.playerStatus.hand];
  const handRow = playerHand;
  const emptyHandSpaces = 4 - playerHand.length;
  for (let i = 0; i < emptyHandSpaces; i++) {
    handRow.push({ id: v4(), value: 0 });
  }

  // create deal row arrays
  const cardsInPlay = [...props.playerStatus.cardsInPlay];
  const firstDealRow = cardsInPlay.slice(0, 4);
  const emptyFirstRowSpaces = 4 - firstDealRow.length;
  for (let i = 0; i < emptyFirstRowSpaces; i++) {
    firstDealRow.push({ id: v4(), value: 0, type: 'main', usableSpace: (selectedCard && !isCPU && i === 0) });
  }
  const secondDealRow = cardsInPlay.slice(4, 9);
  const emptySecondRowSpaces = 5 - secondDealRow.length;
  for (let i = 0; i < emptySecondRowSpaces; i++) {
    secondDealRow.push({ id: v4(), value: 0, type: 'main', usableSpace: (cardsInPlay.length > 4 && selectedCard && !isCPU && i === 0) });
  }

  function handleClickPlaySpace() {
    props.playCard(selectedCard);
    setSelectedCard(null);
  }

  return (
    <StyledPlayerArea
      style={{
        flexDirection: isCPU ? 'column-reverse' : 'column',
      }}
    >
      <DealArea style={{ flexDirection: isCPU ? 'column' : 'column-reverse' }}>
        {[secondDealRow, firstDealRow].map((row, r) =>
          <div key={r} className='deal-row'>
            {row.map(cardData =>
              <Card
                key={cardData.id}
                value={cardData.value}
                type={cardData.type}
                usableSpace={cardData.usableSpace}
                onClick={cardData.usableSpace ? () => handleClickPlaySpace() : null}
              />
            )}
            {r === 1 && <ScoreArea playerObject={props.playerObject} playerStatus={props.playerStatus} />}
          </div>
        )}
      </DealArea>
      <HandArea
        className={props.isTurn ? 'current-turn' : ''}
        style={
          isCPU ? {
            flexDirection: 'row-reverse',
            paddingRight: `calc(var(--main-padding) * 2)`,
          } : {
            flexDirection: 'row',
            paddingLeft: `calc(var(--main-padding) * 2)`,
          }
        }
      >
        <div className='portrait-area'>{props.portrait}</div>
        <HandCards>
          {isCPU ?
            <>
              {handRow.map(card =>
                card.value ? <StyledCardBack key={card.id} /> : <Card key={v4()} value={0} />
              )}
            </>
            :
            <>
              {handRow.map(card =>
                <Card
                  key={card.id}
                  value={card.value}
                  selected={card === selectedCard}
                  onClick={props.isTurn && props.turnPhase === 'waiting' ?
                    () => setSelectedCard(selectedCard === card ? undefined : card)
                    :
                    null
                  }
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
  turnPhase: PropTypes.string,
  playCard: PropTypes.func,
};

export default PlayerArea;