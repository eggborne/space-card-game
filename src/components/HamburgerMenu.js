import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Buttons/Button';
import OptionsDisplay from './OptionsDisplay';

const StyledHamburgerMenu = styled.div`
  --hamburger-menu-width: calc(var(--main-width) * 0.7);
  position: absolute;
  bottom: calc(var(--expanded-footer-height) + (var(--main-padding) / 2));
  right: 0;
  min-height: 60vh;
  width: var(--hamburger-menu-width);
  display: flex;
  flex-direction: column;
  align-items: stretch;
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

  & > h1, h4 {
    text-align: center;
    padding-bottom: 1rem;
  }
  
  & h4 {
    font-weight: normal;
    & > div {
      margin: 0.25rem;
      color: lightgreen;
      font-size: 1.25rem;
    }
  }

  & button {
    padding: 1rem;
  }

  &.open {
    transform: none;
  }
`;

const StyledOptionsDisplay = styled(OptionsDisplay)`
  margin: 1rem 0;
`;

function HamburgerMenu(props) {
  console.log('HamburgerMenu', props);

  function handleClickEndGame() {
    props.onClickEndGame();
  }

  const ownTheme = props.user.preferences.appliedUITheme.creatorId === props.user.id;

  return (
    <StyledHamburgerMenu 
      className={props.open ? 'menu-style open' : 'menu-style'}
    >
      {props.user.preferences.appliedUITheme.name && 
      <h4>using theme 
      <div>{props.user.preferences.appliedUITheme.name}</div>
        by {props.user.preferences.appliedUITheme.creatorData.displayName} {ownTheme && '(you!)'}
      </h4>}
      <StyledOptionsDisplay location='hamburger-menu' user={props.user} ui={props.user.preferences.appliedUITheme} handleUpdatingAppliedTheme={props.handleUpdatingAppliedTheme} />
      <Button onClick={handleClickEndGame} label="End Game" />
    </StyledHamburgerMenu>
  );
}

HamburgerMenu.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  handleUpdatingAppliedTheme: PropTypes.func,
  onClickEndGame: PropTypes.func,
}

export default HamburgerMenu;