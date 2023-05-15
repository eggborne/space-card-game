import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Buttons/Button';

const StyledHamburgerMenu = styled.div`
  --hamburger-menu-width: calc(var(--main-width) * 0.7);
  position: absolute;
  bottom: calc(var(--expanded-footer-height) + (var(--main-padding) / 2));
  right: 0;
  min-height: 60vh;
  width: var(--hamburger-menu-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  max-height: 100%;
  padding: var(--menu-padding);
  padding-bottom: 1.5rem;
 
  border-right: none !important;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
  border-top-left-radius: var(--border-radius);
  border-width: var(--button-border-width);
  transform: translateX(100%);
  transition: transform 250ms ease-in;
  will-change: transform;

  z-index: 2;

  & button {
    padding: 1rem;
  }

  &.open {
    transform: none;
  }
`;

function HamburgerMenu(props) {
  function handleClickEndGame() {
    props.onClickEndGame();
  }
  return (
    <StyledHamburgerMenu 
      className={props.open ? 'menu-style open' : 'menu-style'}
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