import { useState } from 'react';
import './LoginArea.css';
import PropTypes from 'prop-types';
import LoginRegisterForm from '../LoginRegisterForm.js/LoginRegisterForm';

function LoginArea(props) {
  const [loginShowing, setLoginShowing] = useState('login');

  return (
    <div className="LoginArea">
      <LoginRegisterForm loginShowing={loginShowing} />
      <div className='bottom-button-area'>
        <div onClick={() => setLoginShowing('login')} className={loginShowing === 'login' ? 'tab-button selected' : 'tab-button'}>Log In</div>
        <div onClick={() => setLoginShowing('register')} className={loginShowing === 'register' ? 'tab-button selected' : 'tab-button'}>Register</div>
      </div>
    </div>
  );
}

LoginArea.propTypes = {
  loginShowing: PropTypes.string
};

export default LoginArea;
