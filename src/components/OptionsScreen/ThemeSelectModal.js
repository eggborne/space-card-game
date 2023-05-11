import { useState } from 'react';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledThemeSelectModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: calc(var(--main-width) - 5rem);
  height: unset;
  min-height: unset;
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

  & input {
    padding: 0.5rem;
    font-style: inherit;
    font-size: inherit;
    text-align: center;
    margin-bottom: 1rem;
  }

  & > h2 {
    margin-bottom: 1rem;
  }

  & > .theme-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, 1fr);
    min-height: 16rem;
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

function ThemeSelectModal(props) { 

  return (
    <StyledThemeSelectModal 
      style={{
        opacity: props.showing ? '1' : '0',
        pointerEvents: props.showing ? 'all' : 'none',
        scale: props.showing ? '1' : '1.1',
      }}
      className='menu-style'
    >
      <h2>Choose Theme</h2>
      <div className='theme-grid'>
        
      </div>
      <div className='bottom-button-area'>
        <Button onClick={props.onClickOK} color='green' label='OK!' />
      </div>
    </StyledThemeSelectModal>
  );
}

ThemeSelectModal.propTypes = {
  showing: PropTypes.bool,
  onClickOK: PropTypes.func,
};

export default ThemeSelectModal;
