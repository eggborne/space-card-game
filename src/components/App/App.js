import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TitleScreen from '../TitleScreen/TitleScreen';

function App() {

  const [loginShowing, setLoginShowing] = useState('login');

  function toggleLoginShowing() {
    setLoginShowing(loginShowing === 'login' ? 'register' : 'login');
  }

  return (
    <div className="App">
      <Header />
      <TitleScreen 
        loginComponent={
          loginShowing === 'login' ?
          <div className='login-component'>login component</div>
          :
          <div className='login-component'>register component</div>
        }
      
      />
      <Footer />
    </div>
  );
}

export default App;
