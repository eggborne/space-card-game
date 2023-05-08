import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Buttons/Button';

const StyledHamburgerMenu = styled.div`
  position: absolute;
  bottom: var(--expanded-footer-height);
  right: 0;
  min-height: 60vh;
  min-width: 60vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  padding: 1rem;
  background-color: var(--hamburger-bg-color);
  border: solid #00000044;
  cursor: pointer;
  border-top-left-radius: var(--border-radius);
  border-width: var(--button-border-width);
  transform: translateX(100%);
  transition: all 300ms ease;
  z-index: 2;

  &.open {
    transform: none;
  }
`;

function HamburgerMenu(props) {
  function handleClickEndGame() {
    console.log('clicked end game');
    props.onClickEndGame();
  }
  return (
    <StyledHamburgerMenu 
      className={props.open ? 'open' : ''}
    >
      <Button onClick={handleClickEndGame} label="End Game" />
    </StyledHamburgerMenu>
  );
}

HamburgerMenu.propTypes = {
  open: PropTypes.bool,
  onClickEndGame: PropTypes.func,
}

export default HamburgerMenu;