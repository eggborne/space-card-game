import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import UserProfileDisplay from '../UserProfileDisplay';
import PlayerPortrait from '../PlayerPortrait';

const StyledHallOfFameScreen = styled.div`
  position: absolute;
  top: calc(var(--header-height) + (var(--main-padding) / 2));
  left: 0;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: var(--main-width);
  height: calc(var(--actual-height) - var(--expanded-footer-height) - var(--header-height) - var(--main-padding));

  transform-origin: center;

  opacity: 1;
  scale: 1;
  pointer-events: all;
  text-shadow: -1px 0px 0 #00000066, 0px -1px 0 #00000066, -0px 1px 0 #00000066, 0px 1px 0 #00000066;


  transition: all 300ms ease-out;

  & > h1.user-list-header {
    margin-bottom: 0rem;
    font-family: var(--block-font);
    line-height: 4rem;
  }

  & > .user-list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: auto;
  }

  &.hidden {
    pointer-events: none;
    opacity: 0;
    scale: 0.9;
    transition-: 0ms;
  }
`;

function HallOfFameScreen(props) {
  return (
    <StyledHallOfFameScreen className={props.showing ? 'menu-style' : 'menu-style hidden'}>
      <h1 className='user-list-header'>Hall of Fame</h1>
      <div className='user-list'>
        {props.userList.map(userObj =>
          <UserProfileDisplay 
            key={userObj.id}
            userLoggedIn={true}
            user={userObj}
          />
        )}
      </div>
    </StyledHallOfFameScreen>
  );
}

HallOfFameScreen.propTypes = {
  showing: PropTypes.bool,
  userList: PropTypes.array,
};

export default HallOfFameScreen;