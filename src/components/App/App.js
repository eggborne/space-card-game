import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import LoginArea from '../LoginArea/LoginArea';

function App() {

  return (
    <div className="App">
      <Header />
      <TitleScreen 
        loginComponent={<LoginArea />}
      
      />
      <Footer />
    </div>
  );
}

export default App;
