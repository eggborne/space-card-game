import { useState } from 'react';
import './LoginRegisterForm.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

function LoginRegisterForm(props) {
  return (
    <div className={`LoginRegisterForm ${props.loginShowing}`}>
      <form>
        <h2>Log In</h2>
        <div><input name='userName' type='text' placeholder='User Name' autoComplete='username' /></div>
        <div><input disabled name='password' type='password' placeholder='Password' autoComplete='current-password' /></div>
        <div className='form-button-area'><Button label='Log in' /></div>
      </form>
      
      <form>
        <h2>Register</h2>
        <div><input tabIndex={props.loginShowing === 'login' ? '-1' : '1'} name='userName' type='text' placeholder='User Name' /></div>
        <div><input tabIndex={props.loginShowing === 'login' ? '-1' : '1'} name='password' type='password' placeholder='Password' autoComplete='new-password' /></div>
        <div><input tabIndex={props.loginShowing === 'login' ? '-1' : '1'} name='repeatPassword' type='password' placeholder='Repeat Password' autoComplete='new-password' /></div>
        <div input tabIndex={props.loginShowing === 'login' ? '-1' : '1'} className='form-button-area'>
          <Button label='Register' tabIndex={props.loginShowing === 'login' ? '-1' : '1'}/>
        </div>
      </form>
    </div>
  );
}

LoginRegisterForm.propTypes = {
  loginShowing: PropTypes.string
};

export default LoginRegisterForm;
