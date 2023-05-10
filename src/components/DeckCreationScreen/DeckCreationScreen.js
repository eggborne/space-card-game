import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import CardSpace from '../CardSpace';
import { useEffect } from 'react';

const StyledDeckCreationScreen = styled.div`
  height: calc(var(--actual-height) - var(--expanded-footer-height));
  width: var(--main-width);
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  // padding-bottom: var(--expanded-footer-height);
  padding-top: calc(var(--header-height) + 1rem);

  & h4:last-of-type {
    font-size: 0.95rem;
    opacity: 0.75;
  }
  
  
  & .available-card-rows, .selected-card-rows {
    max-width: var(--main-width);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--main-padding);
  }

  & .selected-card-rows {
    max-width: calc(var(--main-width) - var(--card-width));
    align-items: flex-end;
  }
  
  & > .bottom-area {
    display: flex;
    justify-content: flex-end;
  }
`;

function deckHasCardWithId(id, deck) {
  console.log('searching', deck, 'for card with id ' + id);
  const hasCard = deck.filter(card => card.id === id).length > 0;
  console.log('has?', hasCard)
  return hasCard;
}

function DeckCreationScreen(props) {
  console.log('DeckCreationScreen props', props)
  const [ selectedCards, setSelectedCards ] = useState(props.user.deck);

  useEffect(() => {
    setSelectedCards(props.user.deck);
  }, [props.user.deck, selectedCards])

  const availableSelection = props.cardSelection.filter(card => !deckHasCardWithId(card.id, props.user.deck));
  console.log('availableSelection is', availableSelection);

  const emptyAvailableCardSpaces = 15 - availableSelection.length;
  const emptySelectedCardSpaces = 10 - selectedCards.length;

  function handleSelectCardClick(cardObj) {
    if (selectedCards.length < 10) {
      setSelectedCards([...selectedCards, cardObj]);
      props.onAddCardToDeck(cardObj);
    } else {

    }
  }

  function handleReplaceCardClick(cardObj) {
    const newSelectedCards = [...selectedCards];
    newSelectedCards.splice(newSelectedCards.indexOf(cardObj), 1);
    setSelectedCards(newSelectedCards);
    props.onAddCardToDeck(cardObj, true);
  }

  const emptyAvailableCardComponents = [];
  for (let i=0; i< emptyAvailableCardSpaces; i++) {
    emptyAvailableCardComponents.push(<CardSpace key={`available-space-${i}`} scale={0.8} />);
  }

  const emptySelectionComponents = [];
  for (let i=0; i< emptySelectedCardSpaces; i++) {
    emptySelectionComponents.push(<CardSpace key={`selected-space-${i}`} scale={0.75} />);
  }

  return (
    <StyledDeckCreationScreen style={{ display: props.showing ? 'flex' : 'none' }}>
      <h3>Select 10 cards</h3>
      <div className='available-card-rows'>
        {availableSelection.map(cardObj => 
          selectedCards.indexOf(cardObj) === -1 ? 
            <Card onClick={() => handleSelectCardClick(cardObj)} key={`available-card-${cardObj.id}`} value={cardObj.value} scale={0.8} />
            :
            <CardSpace key={`available-card-space-${cardObj.id}`} scale={0.8}/>
          )
        }
        {emptyAvailableCardComponents.map(cardObj => cardObj )}
      </div>
      <h4 style={{marginTop: '1rem'}}>Your deck:</h4>
      <div className='bottom-area'>
        <div className='selected-card-rows'>
          {selectedCards.map(cardObj => 
            <Card onClick={() => handleReplaceCardClick(cardObj)} key={`selected-card-${cardObj.id}`} value={cardObj.value} scale={0.75} 
            />)}
            {emptySelectionComponents.map(cardObj => cardObj )}
        </div>
      </div>
      <h4>(press OK to randomize remaining)</h4>
    </StyledDeckCreationScreen>
  );
}

DeckCreationScreen.propTypes = {
  user: PropTypes.object,
  showing: PropTypes.bool,
  cardSelection: PropTypes.arrayOf(PropTypes.object),
  currentGame: PropTypes.object,
  onAddCardToDeck: PropTypes.func,
};

export default DeckCreationScreen;