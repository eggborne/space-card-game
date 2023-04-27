import { useState } from 'react';
import './LoginRegisterForm.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

function LoginRegisterForm(props) {

  const [playingAsGuest, setPlayingAsGuest] = useState(true);

  function handleInputChange(e) {
    console.log('e', e)
    setPlayingAsGuest(!e.target.value);
  }

  function handleLogIn(e) {
    e.preventDefault();
    const user = {
      userName: e.target.userName.value || 'Guest Player',
    }
    if (!playingAsGuest) {
      user.password = e.target.password.value;
    }
    console.log('LoginRegisterForm handleLogin got user');
    console.table(user);
    props.handleClickLogIn(user);
  }

  return (
    <div className={`LoginRegisterForm ${props.loginShowing}`}>
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
    </div>
  );
}

LoginRegisterForm.propTypes = {
  loginShowing: PropTypes.string,
  handleClickLogIn: PropTypes.func,
  handleClickRegister: PropTypes.func,
};

export default LoginRegisterForm;
