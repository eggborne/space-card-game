import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';

const StyledCharacterInfoCard = styled.div`
  padding: 1rem;
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;
  
  width: calc((var(--main-width) - 4rem));
  padding: 2rem;
  
  background-color: darksalmon;
  -webkit-transform: perspective(var(--main-width)) rotateX(3deg) scale(0.9);
  opacity: 0.8;

  transition: all 200ms ease-out;

  & > h2 {
    margin: 1rem;
    text-align: center;
    font-size: 1.75rem
  }
  
  & > .opponent-stat-list {
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    margin: 1rem;
    margin-bottom: 0;

    & > .quote, .prize-card-display {
      border-radius: var(--border-radius);
      border-: 0.1rem solid #00000099;
      background-color: #00000022;
      padding: 1rem;
      margin: 0.5rem 0;
      opacity: 0.85;
    }

    & > .quote {
      font-style: italic;
    }

    & > .prize-display {
      // padding: 0;
      margin: 0.5rem 0;
    }

    & .prize-card-display {
      display: flex;
      gap: 0.5rem;
    }
  }

  & > .opponent-strategy-display {
    color: darkgray;
    font-size: 1.1rem;
    margin: 1rem 0;
  }
  
  &.selected {
    -webkit-transform: perspective(var(--main-width)) rotateX(0deg) scale(1);
    outline: 0.5rem solid lightgreen;
    background-color: darkgreen;
    opacity: 1;
  }
`;

function CharacterInfoCard(props) {
  const char = { ...props.characterObj };
  return (
    <StyledCharacterInfoCard onClick={props.onClick} className={`menu-style${props.selected ? ' selected' : ''}`}>
      {props.portraitComponent}
      <h2>{char.displayName}</h2>
      <div className='opponent-stat-list'>
        <div>Species: {char.species}</div>
        <div>Origin: {char.placeOfOrigin}</div>
        <div>Skill level: {char.skillLevel}</div>
        <div className='prize-display'>
          <div>Prize: {char.prize.credits} credits</div>
          <div className='prize-card-display'>
            {char.prize.cards.map(cardObj => 
              <Card key={cardObj.id} scale={0.75} {...cardObj} />
            )}
          </div>
        </div>
        <div className='quote'>{char.quotes.panel}</div>
      </div>
      <div className='opponent-strategy-display'>
        <div>{char.strategy.stand.description}</div>
        <div>{char.strategy.handCards.description}</div>
        <div>{char.strategy.tie.description}</div>
      </div>
    </StyledCharacterInfoCard>
  );
}

CharacterInfoCard.propTypes = {
  selected: PropTypes.bool,
  characterObj: PropTypes.object,
  portraitComponent: PropTypes.object,
  onClick: PropTypes.func,
};

export default CharacterInfoCard;