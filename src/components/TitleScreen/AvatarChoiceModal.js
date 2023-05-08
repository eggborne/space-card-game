import { useState } from 'react';
import PlayerPortrait from '../PlayerPortrait';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAvatarChoiceModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: brown;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  z-index: 2;

  opacity: 0;
  pointer-events: none;
  // scale: 0.9;
  transition: all 200ms ease;

  & > h2 {
    margin-bottom: 1rem;
  }

  & > .avatar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    height: 24rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  & > .bottom-button-area {
    margin: 1rem;
    margin-top: 2rem;
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
          imagePath='/images/avatarsheetlq.jpg'
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
    props.onClickOK(userAvatarChoice);
  }

  return (
    <StyledAvatarChoiceModal style={{
      opacity: props.showing ? '1' : '0',
      pointerEvents: props.showing ? 'all' : 'none',
      // scale: props.showing ? '1' : '0.9',
    }}>
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
        <Button color='green' onClick={() => handleSubmitAvatarChoice()} label='OK!' />
      </div>
    </StyledAvatarChoiceModal>
  );
}

AvatarChoiceModal.propTypes = {
  showing: PropTypes.bool,
  onClickOK: PropTypes.func,
};

export default AvatarChoiceModal;
