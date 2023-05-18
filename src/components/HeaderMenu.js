import styled from 'styled-components';
import PropTypes from 'prop-types';
import UserProfileDisplay from './UserProfileDisplay';

const StyledHeaderMenu = styled.div`
  position: absolute;
  right: 0;
  top: var(--header-height);
  width: var(--main-width);
  color: #bbb;
  padding: 1rem;
  transform-origin: top;
  transform: translateY(calc(-100% - var(--header-height)));
  // -webkit-transform: scaleY(0) perspective(var(--main-width)) rotateX(-60deg); 
  transition: transform 300ms ease-in;
  margin: 0 !important;
  z-index: 1;
  will-change: transform;

  &.open {
    transform: translateY(0);
    // -webkit-transform: scaleY(1) perspective(var(--main-width)) rotateX(0deg); 
  }

  &.open.slide {
    
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
  return (
    <StyledHeaderMenu className={props.open ? 'menu-style open' : 'menu-style'}>
    <UserProfileDisplay 
      userLoggedIn={props.userLoggedIn}
      currentUser={props.currentUser}
      user={props.user}
      phase={props.phase}
      onClickLogOut={props.onClickLogOut}
    />
    </StyledHeaderMenu>
  );
}

HeaderMenu.propTypes = {
  userLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  open: PropTypes.bool,
  currentUser: PropTypes.object,
  onClickLogOut: PropTypes.func,
};

export default HeaderMenu;
