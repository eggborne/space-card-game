import { useState } from 'react';
import './LoginArea.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

function LoginArea(props) {
  const [loginShowing, setLoginShowing] = useState('login');

  function toggleLoginShowing() {
    setLoginShowing(loginShowing === 'login' ? 'register' : 'login');
  }

  return (
    <div className="LoginArea">
      <div className='login-component'>
        {loginShowing === 'login' ?
          <form>
            <h3>Log In</h3>
            <div><label>Name: <input name='userName' type='text' /></label></div>
          </form>
          :
          <form>
            <h3>Register</h3>
            <div><label>Name: <input name='userName' type='text' /></label></div>
            <div><label>Password: <input name='password' type='password' /></label></div>
            <div><label>Repeat password: <input name='repeatPassword' type='password' /></label></div>
          </form>
        }
        <div className='bottom-button-area'>
          <div onClick={() => setLoginShowing('login')} className={loginShowing === 'login' ? 'tab-button selected' : 'tab-button'}>Log In</div>
          <div onClick={() => setLoginShowing('register')} className={loginShowing === 'register' ? 'tab-button selected' : 'tab-button'}>Register</div>
        </div>
      </div>
      
    </div>
  );
}

LoginArea.propTypes = {
  loginShowing: PropTypes.string
};

export default LoginArea;
