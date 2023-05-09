import Button from './Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background-color: brown;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 1rem;
  border: 0.25rem solid #00000066;
  width: calc(var(--main-width) * 0.75);
  z-index: 2;
  transition: all 300ms ease;
  box-shadow: var(--main-box-shadow);

  & > * {
    text-align: center;
  }

  & > h2 {
    margin: 1rem 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    & > button {
      width: 90%;
    }
  }
`;

function Modal(props) { 

  return (
    <StyledModal style={{
      opacity: props.showing ? '1' : '0',
      pointerEvents: props.showing ? 'all' : 'none',
      scale: props.showing ? '1' : '0.9',
      backgroundColor: props.color,
      // scale: props.showing ? '1' : '0.9',
    }
    } className='menu-style'>
      <h2>{props.headline}</h2>
      <div>{props.bodyComponent}</div>
      <div className='bottom-button-area'>
        <Button color='red' onClick={props.onClickOK} label={props.buttonLabel} />
        <Button onClick={props.onClickCancel} label='Cancel' />
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
  onClickCancel: PropTypes.func,
};

export default Modal;
