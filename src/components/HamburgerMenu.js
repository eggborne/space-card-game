import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Buttons/Button';
import OptionsDisplay from './OptionsDisplay';

const StyledHamburgerMenu = styled.div`
  position: absolute;
  bottom: calc(var(--expanded-footer-height) + (var(--main-padding) / 2));
  right: 0;
  width: var(--hamburger-menu-width);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  // justify-content: flex-end;
  max-height: calc(var(--actual-height) - var(--expanded-footer-height));
  padding: 1.5rem var(--menu-padding);
  padding-top: 0;
 
  border-right: none !important;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
  border-top-left-radius: var(--border-radius);
  border-width: var(--button-border-width);
  transform: translateX(100%);
  transition: transform 250ms ease-in;
  will-change: transform;

  font-size: 0.75rem;

  z-index: 2;

  overflow-y: auto;

  & > h1, h4 {
    text-align: center;
    padding-bottom: 1.5rem;
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
    padding: 1rem 0;
    width: 65%;
    align-self: center;
  }

  &.open {
    transform: none;
  }
`;

const StyledOptionsDisplay = styled(OptionsDisplay)`
  position: absolute !important;
  top: 200px;
  margin: 1rem 0;

`;

function HamburgerMenu(props) {
  function handleClickEndGame() {
    props.onClickEndGame();
  }

  const ownTheme = props.user.preferences.appliedUITheme.creatorId === props.user.id;

  return (
    <StyledHamburgerMenu 
      className={props.open ? 'menu-style open' : 'menu-style'}
    >
      <StyledOptionsDisplay location='hamburger-menu' user={props.user} ui={props.user.preferences.appliedUITheme} handleUpdatingAppliedTheme={props.handleUpdatingAppliedTheme} />
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Button color='red' onClick={handleClickEndGame} label="End Game" />
      </div>
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