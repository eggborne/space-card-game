import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import CharacterInfoCard from './CharacterInfoCard';
import PlayerPortrait from '../PlayerPortrait';

const StyledOpponentSelectionScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding-bottom: var(--expanded-footer-height);
  padding-top: calc(var(--header-height) + 1rem);

  & > .opponent-list-header {
    margin-bottom: 1rem;
  }

  & > .opponent-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

function OpponentSelectionScreen(props) {
  const [selectedOpponent, setSelectedOpponent] = useState(Object.keys(props.characters)[0]);

  const characterList = Object.values(props.characters);

  console.log('char list');
  console.log(characterList)

  const sheetWidth = 8;

  function coordsForIndex(index) {
    return {
      x: (index % sheetWidth),
      y: Math.floor(index / sheetWidth),
    };
  }

  function handleClickCharacterCard(opponentArg, imageCoords) {
    const newOpponent = {...opponentArg};
    newOpponent.sheetCoords = imageCoords;
    setSelectedOpponent(newOpponent.name);
    props.onSelectOpponent(newOpponent);
  }

  return (
    <StyledOpponentSelectionScreen style={{ display: props.showing ? 'flex' : 'none' }}>
      <h1 className='opponent-list-header'>Choose Opponent</h1>
      <div className='opponent-list'>
        {characterList.map((characterObj, c) =>
          <CharacterInfoCard
            key={c}
            onClick={() => handleClickCharacterCard(characterObj, coordsForIndex(c))}
            selected={selectedOpponent === characterObj.name}
            characterObj={characterObj}
            portraitComponent={
              <PlayerPortrait
                size='calc(var(--main-width) * 0.55)'
                imagePath='images/opponentsheet.jpg'
                sheetCoords={coordsForIndex(c)}
              />
            }
          />
        )}
      </div>
    </StyledOpponentSelectionScreen>
  );
}

OpponentSelectionScreen.propTypes = {
  showing: PropTypes.bool,
  characters: PropTypes.object,
  onSelectOpponent: PropTypes.func,
};

export default OpponentSelectionScreen;