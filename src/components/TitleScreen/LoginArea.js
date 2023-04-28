import { useState } from 'react';
import PropTypes from 'prop-types';
import LoginRegisterForm from './LoginRegisterForm';
import styled from 'styled-components';

const StyledLoginArea = styled.div`
  position: relative;
  background-color: olivedrab;
  border-radius: 0.25rem;
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
      transition: background-color 200ms ease;

      &.selected {
        background-color: olivedrab;
        color: #ddd;
        border: 2px solid orange;
        border-top: rgb(99, 108, 80);
      }
    }
  }
`;

function LoginArea(props) {
  const [loginShowing, setLoginShowing] = useState('login');

  return (
    <StyledLoginArea>
      <LoginRegisterForm
        loginShowing={loginShowing}
        handleClickLogIn={props.handleClickLogIn}
      />
      <div className='bottom-button-area'>
        <div onClick={() => setLoginShowing('login')} className={loginShowing === 'login' ? 'tab-button selected' : 'tab-button'}>Log In</div>
        <div onClick={() => setLoginShowing('register')} className={loginShowing === 'register' ? 'tab-button selected' : 'tab-button'}>Register</div>
      </div>
    </StyledLoginArea>
  );
}

LoginArea.propTypes = {
  loginShowing: PropTypes.string,
  handleClickLogIn: PropTypes.func,
};

export default LoginArea;
