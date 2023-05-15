import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginRegisterForm from './LoginRegisterForm';
import Button from '../Buttons/Button';
import UserProfileDisplay from '../UserProfileDisplay';
import styled from 'styled-components';

const StyledLoginArea = styled.div`
  position: relative;
  background-color: #22ff2222;
  border-radius: var(--border-radius);
  border: 0.5rem solid var(--menu-border-color);
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;

  & .logged-in.bottom-button-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    padding-bottom: 1rem;

    & button:first-of-type {
      background-color: maroon !important;
      height: 3rem;
      padding: 0;
    }
    & button:last-of-type {
      background-color: green !important;
      width: 14rem;
      height: 5rem;
      padding: 0;
      margin: 2rem;
    }
  }

  & .bottom-button-area {
    display: flex;
    width: 100%;
    bottom: 0;

    & .tab-button {
      width: 50%;
      height: 4rem;
      background-color: rgb(99, 108, 80);
      color: rgb(184, 184, 184);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      cursor: pointer;
      transition: all 100ms ease;

      &:first-of-type {
        border-bottom-left-radius: var(--border-radius);
        border-right: 0 !important;
      }
      &:last-of-type {
        border-bottom-right-radius: var(--border-radius);
        border-left: 0 !important;
      }

      &.selected {
        background-color: olivedrab;
        color: #ddd;
      }
    }

    & .tab-button:not(.selected):hover {
      border: 0.25rem solid gray;
      border-top: 0;
    }
  }
`;

function LoginArea(props) {
  const [loginShowing, setLoginShowing] = useState('login');
  return (
    <StyledLoginArea className='menu-style'>
      {!props.userLoggedIn ? 
        <>
          <LoginRegisterForm
            loginShowing={loginShowing}
            handleClickLogIn={props.handleClickLogIn}
            handleClickRegister={props.handleClickRegister}
            setAvatarChoiceModalShowing={props.setAvatarChoiceModalShowing}
          />
          <div className='bottom-button-area'>
            <div onClick={() => setLoginShowing('login')} className={loginShowing === 'login' ? 'tab-button selected' : 'tab-button'}>Log In</div>
            <div onClick={() => setLoginShowing('register')} className={loginShowing === 'register' ? 'tab-button selected' : 'tab-button'}>Register</div>
          </div>
        </>
        :
        <>
        <div style={{ margin: '0 1rem' }}>
          <UserProfileDisplay 
            user={props.user}
            userLoggedIn={props.userLoggedIn}
            currentUser={props.authUser}
            phase={props.phase}
            onClickLogOut={props.onClickLogOut}
          />
        </div>
          <div className='logged-in bottom-button-area'>
            {/* <Button onClick={props.onClickLogOut} label='Log out'/> */}
            <Button fontSize='2rem' onClick={props.onClickPlay} label='Play'/>
          </div>
          {/* <div style={{margin: '2rem 0'}}>Logged in as {props.user.displayName} ({props.user.email})</div>
          <div className='logged-in bottom-button-area'>
            <Button onClick={props.onClickLogOut} label='Log out'/>
            <Button onClick={props.onClickPlay} label='Play'/>
          </div> */}
        </>
      }
    </StyledLoginArea>
  );
}

LoginArea.propTypes = {
  user: PropTypes.object,
  authUser: PropTypes.object,
  loginShowing: PropTypes.string,
  onClickPlay: PropTypes.func,
  handleClickLogIn: PropTypes.func,
  handleClickRegister: PropTypes.func,
  setAvatarChoiceModalShowing: PropTypes.func,
  userLoggedIn: PropTypes.bool,
};

export default LoginArea;
