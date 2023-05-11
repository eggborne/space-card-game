import { useState } from 'react';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSaveThemeModal = styled.div`
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

  & form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 80%;

    & label {
      padding: 1rem;
    }

    & input {
      padding: 1rem 0;
      margin: 0;
      width: unset;

      &[type="text"] {
        width: 100%;
      }

      &[type="checkbox"] {
        scale: 2;
      }
    }
    
    & > .form-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      justify-content: center;
    }
  }

  & .bottom-button-area {
    text-align: center;
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

function SaveThemeModal(props) { 
  return (
    <StyledSaveThemeModal 
      style={{
        opacity: props.showing ? '1' : '0',
        pointerEvents: props.showing ? 'all' : 'none',
        scale: props.showing ? '1' : '1.1',
      }}
      className='menu-style'
    >
      <h2>Save Theme</h2>
      <form>
        <div className='form-row'>
          <input type='text' name='theme-title' placeholder='Name your theme'/>
        </div>
        <div className='form-row'>
          <label htmlFor='make-public'>Public</label>
          <input defaultChecked type='checkbox' name='make-public' />
        </div>
        <div className='bottom-button-area'>
          <Button onClick={props.onClickOK} color='green' label='OK!' />
        </div>
      </form>
    </StyledSaveThemeModal>
  );
}

SaveThemeModal.propTypes = {
  showing: PropTypes.bool,
  onClickOK: PropTypes.func,
};

export default SaveThemeModal;
