import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginRegisterForm from './LoginRegisterForm';
import Button from '../Buttons/Button';
import styled from 'styled-components';

const StyledLoginArea = styled.div`
  position: relative;
  background-color: olivedrab;
  border-radius: var(--border-radius);
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  padding-bottom: 6rem;

  & .bottom-button-area {
    position: absolute;
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
    <StyledLoginArea>
      {!props.showLogOut ? 
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
          <div style={{margin: '2rem 0'}}>Logged in as {props.user.displayName} ({props.user.email})</div>
          <Button onClick={props.onClickLogOut} label='Log out'/>
        </>
      }
    </StyledLoginArea>
  );
}

LoginArea.propTypes = {
  user: PropTypes.object,
  loginShowing: PropTypes.string,
  handleClickLogIn: PropTypes.func,
  handleClickRegister: PropTypes.func,
  setAvatarChoiceModalShowing: PropTypes.func,
  showLogOut: PropTypes.bool,
};

export default LoginArea;
