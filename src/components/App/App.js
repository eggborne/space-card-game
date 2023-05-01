import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';
import GameScreen from '../GameScreen/GameScreen';
import styled from 'styled-components';
import { db, auth } from '../../firebase.js'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from "firebase/auth";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { characters, randomOpponents } from '../../characters.js';
import { randomInt, pause } from '../../util.js';

console.warn('got characters')
console.table(characters)
console.warn('got randomOpponents')
console.table(randomOpponents)

const StyledApp = styled.main`
  position: relative;
  background-color: #111;
  color: #ddd;
  width: var(--main-width);
  height: var(--actual-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: url(images/starfield.png);
  background-size: cover;
  background-position: center;
`;

function App() {
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Quick Match');
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState({
    email: '',
    displayName: '',
    imagePath: 'images/avatarsheetlq.jpg',
  });
  const [opponent, setOpponent] = useState({
    displayName: '',
    imagePath: 'images/opponentsheet.jpg',
    sheetCoords: { x: randomInt(0, 7), y: randomInt(0, 2) },
  });
  const [avatarChoiceModalShowing, setAvatarChoiceModalShowing] = useState(false);

  function handleClickLogIn(user) {
    console.warn('handleClickLogin got user')
    console.table(user)
    if (user.password) {
      signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log(`You've successfully signed in as ${userCredential.user.email}!`);
        setCurrentUser(auth.currentUser);
        setPhase('game-mode-select')
      })
      .catch((error) => {
        console.log(`There was an error signing in: ${error.message}!`)
      });
      // do user login stuff
    } else {
      // guest user
      setUser({
        email: '',
        displayName: user.displayName,
        imagePath: 'images/avatarsheetlq.jpg',
      });

      setAvatarChoiceModalShowing(true);
    }
  }

  async function handleClickRegister(newUser) {
    console.warn('handleClickRegister got newUser');
    console.table(newUser);

    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCredential) => {
        // User successfully signed up 
        console.log('REGISTERED!', userCredential);

        await addDoc(collection(db, "users"), newUser);


        updateProfile(auth.currentUser, {
          displayName: newUser.displayName
        }).then(() => {
          console.log('PROFILE UPDATED! /////////////////////////////////');
          console.log(auth.currentUser)
          // ...
        }).catch((error) => {
          console.log('profile not updated :(')
          // An error occurred
          // ...
        });
        // setAvatarChoiceModalShowing(true);
      })
      .catch((error) => {
        console.log('ERROR', error)
        // There was an error with sign up
      });


  }
  
  function handleChooseAvatar(newSheetCoords) {
    setUser({
      displayName: user.displayName,
      imagePath: 'images/avatarsheetlq.jpg',
      sheetCoords: newSheetCoords,
    });
    setAvatarChoiceModalShowing(false);
    setPhase('game-mode-select');
  }

  function handleSwitchGameMode(newMode) {
    setGameMode(newMode);
  }

  function handleAcceptGameMode() {
    if (gameMode === 'Campaign') {
      
    } else if (gameMode === 'Quick Match') {
      let randomX = randomInt(0, 5);
      let characterData = Object.values(randomOpponents)[randomX];
      setOpponent({
        ...characterData,
        imagePath: 'images/opponentsheet.jpg',
        sheetCoords: { x: randomX, y: 3 },
      });
      setPhase('game-board-showing');
    }
  }

  function handleCloseAvatarModal() {
    setAvatarChoiceModalShowing(false);
  }

  function handleLogOut() {
    signOut(auth)
      .then(function() {
        console.log("You have successfully signed out!");
      }).catch(function(error) {
        console.log(`There was an error signing out: ${error.message}!`);
      });
  }


  return (
    <StyledApp >
      <Header 
        currentUser={currentUser}
        displayName={user.displayName}
        imagePath={user.imagePath}
        sheetCoords={user.sheetCoords}
        phase={phase}
      />
      <TitleScreen 
        showing={phase === 'title'}
        handleClickLogIn={handleClickLogIn}
        handleClickRegister={handleClickRegister}
        handleChooseAvatar={handleChooseAvatar}
        avatarChoiceModalShowing={avatarChoiceModalShowing}
        setAvatarChoiceModalShowing={() => setAvatarChoiceModalShowing(true)}
        handleCloseAvatarModal={handleCloseAvatarModal}
      />
      <GameModeSelectScreen 
        showing={phase === 'game-mode-select'}
        gameMode={gameMode}
        switchGameMode={handleSwitchGameMode}
      />
      {phase === 'game-board-showing' && <GameScreen 
        showing={phase === 'game-board-showing'}
        user={{...user}}
        opponent={{...opponent}}
      />}
      <Footer 
        phase={phase}
        onClickBackToTitle={() => setPhase('title')}
        onClickBackToGameSelect={() => setPhase('game-mode-select')}
        onClickAcceptGameMode={handleAcceptGameMode}
      />
    </StyledApp>
  );
}

export default App;
