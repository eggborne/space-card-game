import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import LoginArea from '../LoginArea/LoginArea';

function App() {

  document.documentElement.style.setProperty('--actual-height', window.innerHeight + 'px');

  return (
    <div className="App">
      <Header />
      <TitleScreen />
      <Footer />
    </div>
  );
}

export default App;
