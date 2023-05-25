import { useState } from 'react';
import PlayerPortrait from '../PlayerPortrait';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { randomInt } from '../../util';

const StyledAvatarChoiceModal = styled.div`
  position: absolute;
  height: 90%;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background-color: brown;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  z-index: 2;

  opacity: 0;
  pointer-events: none;
  transition: all 200ms ease;

  & input {
    padding: 0.5rem;
    font-style: inherit;
    font-size: inherit;
    text-align: center;
    margin-bottom: 1rem;
  }

  & > h2 {
    margin-bottom: 1rem;
    font-family: var(--block-font);
  }

  & > .avatar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    // height: 16rem;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  & > .bottom-button-area {
    margin: 1rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ClickablePortraitContainer = styled.div`
  padding: 0.25rem;
  opacity: 0.5;
  transition: all 200ms;
  cursor: pointer;
  
  &.selected {
    opacity: 1;

    & > div {
      border-color: lightgreen;
    }
  }

  &:hover {
    scale: 1.05;
    opacity: 1;
  }
`;
function getArrayOfPortraits() {
  let avatarPortraits = [];
  for (let y = 0; y < 3; y++) {
    let avatarRow = [];
    for (let x = 0; x < 8; x++) {
      avatarRow.push(
        <PlayerPortrait
          size='calc(var(--main-width) * 0.165)'
          imagePath='images/avatarsheethq.jpg'
          sheetCoords={{ x, y }}
        />
        );
    }
    avatarPortraits.push(avatarRow)
  }
  return avatarPortraits;
}

function AvatarChoiceModal(props) { 
  const [userAvatarChoice, setUserAvatarChoice] = useState({ x: 0, y: 0 });

  function handleSubmitAvatarChoice() {
    const guestName = props.playingAsGuest ? document.getElementById('guest-name-input').value || 'Guest' : null;
    props.onClickOK(userAvatarChoice, guestName);
  }

  function getRandomNameAndAvatar() {
    const randomName = props.getName().fullName;
    document.getElementById('guest-name-input').value = randomName;
    const randomSheetCoords = {
      x: randomInt(0, 7),
      y: randomInt(0, 2),
    }
    setUserAvatarChoice(randomSheetCoords)
  }

  return (
    <StyledAvatarChoiceModal style={{
      opacity: props.showing ? '1' : '0',
      pointerEvents: props.showing ? 'all' : 'none',
      scale: props.showing ? '1' : '1.1',
    }}>
      {props.playingAsGuest && 
        <>
          <h2>Enter Name</h2>
          <input id='guest-name-input' type='text' placeholder='Guest' />
        </>
      }
      <h2>Choose Avatar</h2>
      <div className='avatar-grid'>
        {getArrayOfPortraits().map((row, y) =>  
          row.map((portrait, x) => 
            <ClickablePortraitContainer 
              key={(x+1)*(y+1)}
              onClick={() => setUserAvatarChoice({ x, y })}
              className={(userAvatarChoice.x === x && userAvatarChoice.y === y) ? 'selected' : ''}
            >
              {portrait}
            </ClickablePortraitContainer>
          )
        )}
      </div>
      <div className='bottom-button-area'>
        <Button onClick={getRandomNameAndAvatar} label='Randomize' />
        <Button color='green' onClick={() => handleSubmitAvatarChoice()} label='OK!' />
      </div>
    </StyledAvatarChoiceModal>
  );
}

AvatarChoiceModal.propTypes = {
  playingAsGuest: PropTypes.bool,
  showing: PropTypes.bool,
  getName: PropTypes.func,
  onClickOK: PropTypes.func,
};

export default AvatarChoiceModal;
