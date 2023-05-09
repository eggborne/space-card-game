import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserProfileDisplay from './UserProfileDisplay';

const StyledHeaderMenu = styled.div`
  position: absolute;
  right: 0;
  top: var(--header-height);
  width: var(--main-width);
  background-color: var(--header-color);
  color: #bbb;
  padding: 1rem;
  border-bottom-left-radius: calc(var(--border-radius) / 2);
  border-bottom-right-radius: calc(var(--border-radius) / 2);
  transform-origin: top;
  transform: translateY(calc(-100% - var(--header-height)));
  transition: transform 300ms ease;
  padding-top: 1.5rem;
  z-index: 1;

  &.open {
    transform: translateY(-1rem);
  }

  & .PlayerPortrait {
    opacity: 0.3;
  }

  & > .profile-grid {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-auto-rows: min-content;
    border: 0.1rem solid #00000044;
    border-radius: 0.5rem;
    background-color: #00000022;
    gap: 1rem;
    padding: 1rem;

    & > button {
      grid-row-start: 2;
      grid-column-start: 1;
      height: 3rem;
      padding: 0;
      background-color: maroon !important;
    }

    & > .footer-area {
      font-size: 70%;
      opacity: 0.8;
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      height: min-content;
      align-self: flex-end;
    }

    & > .stat-list {
      grid-row-start: 1;
      grid-column-start: 2;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  & > h1 {
    font-size: 1.4rem;
  }
`;

function HeaderMenu(props) {
  console.log('HeaderMenu props is', props);
  return (
    <StyledHeaderMenu className={props.open && 'open'}>
    <UserProfileDisplay 
      userLoggedIn={props.userLoggedIn}
      currentUser={props.currentUser}
      displayName={props.displayName}
      email={props.email}
      imagePath={props.imagePath}
      sheetCoords={props.sheetCoords}
      phase={props.phase}
      onClickLogOut={props.handleClickLogOut}
    />
    </StyledHeaderMenu>
  );
}

HeaderMenu.propTypes = {
  userLoggedIn: PropTypes.bool,
  open: PropTypes.bool,
  currentUser: PropTypes.object,
  displayName: PropTypes.string,
  email: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.number),
  onClickLogOut: PropTypes.func,
};

export default HeaderMenu;
