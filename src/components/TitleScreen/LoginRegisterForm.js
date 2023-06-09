import { useState } from 'react';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLoginRegisterForm = styled.div`
  border-radius: var(--border-radius);
  display: flex;
  width: 18rem;
  overflow: hidden;

  & h2 {
    margin-bottom: 0.5rem;
  }

  & button:first-of-type {
    font-size: 1.5rem;
    width: 14rem;
    height: 5rem;
    padding: 0;
  }
  & > form:first-of-type button:last-of-type {
    width: 14rem;
    background-color: rgb(66, 94, 23) !important;
  }

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.25rem;
    min-width: 18rem;
    transition: transform 300ms ease;

    & > .bad-credentials {
      position: relative;
      outline: 0.1rem solid red;

      &::after {
        content: 'WRONG PASSWORD';
        position: absolute;
        text-align: center;
        width: 100%;
        bottom: -75%;
        left: 50%;
        translate: -50%;
        color: #ff9999;
        font-weight: bold;
        z-index: 1;

      }
    }

    & input {
      padding: 0.5rem;
      font-style: inherit;
      font-size: inherit;
    }

    & > .form-button-area {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: flex-end;
      margin-top: 2rem;
    }
  }

  &.register > form {
    transform: translateX(-18rem);
  }

  & .password-input-container {
    position: relative;

    & input {
      transition: background-color 200ms ease;
    }

    & > .error-message.password-match {
      position: absolute;
      top: 2.5%;
      right: 2.5%;
      color: red;
      font-weight: bold;
      font-size: 80%;

      opacity: 0;
      transition: opacity 200ms ease;
    }

    &.invalid .error-message.password-match {
      opacity: 1;
    }

    &.invalid input {
      background-color: #ffcccc;
    }
  }
`;

const PasswordInput = styled.input`
  &.invalid {
    outline: solid red;
  }
`;
const RepeatPasswordInput = styled.input`
  &.invalid {
    outline: solid blue;
     
  }
`;

function LoginRegisterForm(props) {

  const [playingAsGuest, setPlayingAsGuest] = useState(true);
  const [nameLengthOkay, setNameLengthOkay] = useState(false);
  const [emailOkay, setEmailOkay] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordLengthOkay, setPasswordLengthOkay] = useState(false);

  function handlePasswordInputChange(e) {
    setPlayingAsGuest(!e.target.value);
    props.clearCredentialsWarning();
  }

  function handleLogIn(e) {
    e.preventDefault();
    const user = {
      displayName: (e.target.displayName && e.target.displayName.value) || 'Guest',
    }
    if (!playingAsGuest) {
      user.password = e.target.password.value;
      user.email = e.target.email.value
    }
    props.handleClickLogIn(user);
  }

  function handleRegisterFormChange(e) {
    const nameOkay = e.target.form.displayName.value.length >= 3;
    const correctEmailFormat = e.target.form.email.value.includes('@') && e.target.form.email.value.includes('.');
    const matching = e.target.form.password.value === e.target.form.repeatPassword.value;
    const passwordOkay = e.target.form.password.value.length >= 6;
    setNameLengthOkay(nameOkay);
    setPasswordsMatch(matching);
    setPasswordLengthOkay(passwordOkay);
    setEmailOkay(correctEmailFormat);
  }

  function handleRegister(e) {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      displayName: e.target.displayName.value,
      password: e.target.password.value
    }
    if (!playingAsGuest) {
      user.password = e.target.password.value;
    }
    // add to db here?
    props.handleClickRegister(user);
    props.setAvatarChoiceModalShowing(true);
  }

  return (
    <StyledLoginRegisterForm className={`LoginRegisterForm ${props.loginShowing}`}>
      <form onSubmit={handleLogIn}>
        <h2>Log In</h2>
        <div><input 
          tabIndex={props.loginShowing === 'register' ? -1 : 1} 
          name='email' 
          type='text' 
          placeholder='Username or Email' 
          autoComplete='email' 
          /></div>
        <div className={props.badCredentials ? 'bad-credentials' : ''}><input 
          onChange={handlePasswordInputChange} 
          tabIndex={props.loginShowing === 'register' ? -1 : 1} 
          id='password-input'
          name='password' 
          type='password' 
          placeholder='Password' 
          autoComplete='current-password' 
          /></div>
        <div className='form-button-area'>
          <Button 
            disabled={playingAsGuest}
            tabIndex={props.loginShowing === 'register' ? -1 : 1}
            color='green'
            label='Log In'
            />
          <Button 
            disabled={!playingAsGuest}
            tabIndex={props.loginShowing === 'register' ? -1 : 1}
            color='green'
            label='Play as guest'
          />
        </div>
      </form>
      <form onChange={handleRegisterFormChange} onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className={`password-input-container${nameLengthOkay ? '' : ' invalid'}`} >
          <div className='error-message password-match'>TOO SHORT</div>
          <input
            tabIndex={props.loginShowing === 'login' ? -1 : 1} 
            name='displayName' 
            type='text' 
            placeholder='Name (3+ characters)' 
            autoComplete='username' 
          />
        </div>
        <div className={`password-input-container${emailOkay ? '' : ' invalid'}`} >
          <div className='error-message password-match'>INVALID EMAIL</div>
          <input
            tabIndex={props.loginShowing === 'login' ? -1 : 1} 
            name='email' 
            type='email' 
            placeholder='Email' 
            autoComplete='email' 
          />
        </div>
        <div className={`password-input-container${passwordLengthOkay ? '' : ' invalid'}`}>
          <div className='error-message password-match'>TOO SHORT</div>
            <PasswordInput
              tabIndex={props.loginShowing === 'login' ? -1 : 1} 
              name='password' 
              type='password' 
              placeholder='Password (6+ characters)' 
              autoComplete='new-password' 
            />
          </div>
        <div className={`password-input-container${passwordsMatch ? '' : ' invalid'}`}>
          <div className='error-message password-match'>DOES NOT MATCH</div>
            <RepeatPasswordInput
              className={passwordsMatch ? '' : 'invalid'}
              tabIndex={props.loginShowing === 'login' ? -1 : 1} 
              name='repeatPassword' 
              type='password' 
              placeholder='Repeat Password' 
              autoComplete='new-password' 
            />
          </div>
        <div tabIndex={props.loginShowing === 'login' ? -1 : 1} className='form-button-area'>
          <Button 
            disabled={!nameLengthOkay || !passwordLengthOkay || !passwordsMatch}
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
  badCredentials: PropTypes.bool,
  clearCredentialsWarning: PropTypes.func,
  handleClickLogIn: PropTypes.func,
  handleClickRegister: PropTypes.func,
  setAvatarChoiceModalShowing: PropTypes.func,
};

export default LoginRegisterForm;
