import { useState } from 'react';
import Button from './Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledModal = styled.div`
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
  border: 0.25rem solid #00000066;
  width: calc(var(--main-width) * 0.55);
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

function Modal(props) { 

  return (
    <StyledModal style={{
      opacity: props.showing ? '1' : '0',
      pointerEvents: props.showing ? 'all' : 'none',
      backgroundColor: props.color,
      // scale: props.showing ? '1' : '0.9',
    }}>
      <h2>Log out?</h2>
      <div className='bottom-button-area'>
        <Button color='red' onClick={props.onClickOK} label={props.buttonLabel} />
      </div>
    </StyledModal>
  );
}

Modal.propTypes = {
  showing: PropTypes.bool,
  headline: PropTypes.string,
  color: PropTypes.string,
  buttonLabel: PropTypes.string,
  bodyComponent: PropTypes.object,
  onClickOK: PropTypes.func,
};

export default Modal;
