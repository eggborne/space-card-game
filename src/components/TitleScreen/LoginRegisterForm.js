import { useState } from 'react';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoginRegisterForm = styled.div`
  border-radius: var(--border-radius);
  display: flex;
  width: 18rem;
  overflow: hidden;

  & button {
    width: 14rem;
  }

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    padding-bottom: 2rem;
    // background: rgb(76, 59, 28);
    min-width: 18rem;
    transition: transform 300ms ease;

    & input {
      padding: 0.5rem;
      font-style: inherit;
      font-size: inherit;
    }

    & > .form-button-area {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
    }
  }

  &.register > form {
    transform: translateX(-18rem);
  }
`;

function LoginRegisterForm(props) {

  const [playingAsGuest, setPlayingAsGuest] = useState(true);

  function handleInputChange(e) {
    setPlayingAsGuest(!e.target.value);
  }

  function handleLogIn(e) {
    e.preventDefault();
    const user = {
      userName: e.target.userName.value || 'Guest',
    }
    if (!playingAsGuest) {
      user.password = e.target.password.value;
    }
    console.table(user);
    props.handleClickLogIn(user);
  }

  return (
    <StyledLoginRegisterForm className={`LoginRegisterForm ${props.loginShowing}`}>
      <form onSubmit={handleLogIn}>
        <h2>Log In</h2>
        <div><input tabIndex={props.loginShowing === 'register' ? -1 : 1} name='userName' type='text' placeholder='Name' autoComplete='username' /></div>
        <div><input onChange={handleInputChange} tabIndex={props.loginShowing === 'register' ? -1 : 1} name='password' type='password' placeholder='Password' autoComplete='current-password' /></div>
        <div className='form-button-area'>
          <Button 
            tabIndex={props.loginShowing === 'register' ? -1 : 1}
            color='green'
            label={playingAsGuest ? 'Play as Guest' : 'Log in'}
          />
        </div>
      </form>
      <form onSubmit={props.handleClickRegister}>
        <h2>Register</h2>
        <div><input tabIndex={props.loginShowing === 'login' ? -1 : 1} name='userName' type='text' placeholder='Name' autoComplete='username' /></div>
        <div><input tabIndex={props.loginShowing === 'login' ? -1 : 1} name='password' type='password' placeholder='Password' autoComplete='new-password' /></div>
        <div><input tabIndex={props.loginShowing === 'login' ? -1 : 1} name='repeatPassword' type='password' placeholder='Repeat Password' autoComplete='new-password' /></div>
        <div tabIndex={props.loginShowing === 'login' ? -1 : 1} className='form-button-area'>
          <Button 
            tabIndex={props.loginShowing === 'login' ? -1: 1}
            color='orange'
            label='Register'
          />
        </div>
      </form>
    </StyledLoginRegisterForm>
  );
}

LoginRegisterForm.propTypes = {
  loginShowing: PropTypes.string,
  handleClickLogIn: PropTypes.func,
  handleClickRegister: PropTypes.func,
};

export default LoginRegisterForm;
