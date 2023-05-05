import { useState, useEffect } from 'react';
import Header from '../Header';
import UserProfileDisplay from '../UserProfileDisplay';
import Footer from '../Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';
import GameScreen from '../GameScreen/GameScreen';
import styled from 'styled-components';
import { db, auth } from '../../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { characters, randomOpponents } from '../../characters.js';
import { randomInt, pause } from '../../util.js';

console.table(characters);
console.table(randomOpponents);

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
  
  transition: all 500ms ease;
`;

function App() {

  auth.onAuthStateChanged(async (alreadyLoggedIn) => {
    if (!!alreadyLoggedIn !== userLoggedIn) {
      console.log('setting userLoggedIn', !!alreadyLoggedIn, 'while userLoggedIn was', userLoggedIn)
      setUserLoggedIn(!!alreadyLoggedIn);
      if (user.email === '') {
        console.warn('setting userData on auth state change')
        await setUserDataForId(alreadyLoggedIn.uid);
      }
    }
  });

  const [loaded, setLoaded] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Quick Match');
  const [user, setUser] = useState({
    email: '',
    displayName: '',
    imagePath: 'images/avatarsheetlq.jpg',
    sheetCoords: { x: 0, y: 0 },

  });
  const [opponent, setOpponent] = useState({
    displayName: '',
    imagePath: 'images/opponentsheet.jpg',
    sheetCoords: { x: randomInt(0, 7), y: randomInt(0, 2) },
  });
  const [avatarChoiceModalShowing, setAvatarChoiceModalShowing] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  async function setUserDataForId(uid) {
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.warn('SETTING DB USERDATA FOR USER!! -------------------------------------------------');
      return setUser(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such userData document!");
    }
  }

  function handleClickLogIn(user) {
    console.warn('handleClickLogin got user');
    console.table(user);
    if (user.password) {
      console.log('--- user used password');
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
          console.log(`You've successfully signed in as ${userCredential.user.email}!`);
          await setUserDataForId(userCredential.user.uid);
          setPhase('game-mode-select');
        })
        .catch((error) => {
          console.log(`There was an error signing in: ${error.message}!`);
        });
    } else {
      console.log('--- user is GUEST');
      setUser({
        email: 'guest@guest.guest',
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
        updateProfile(auth.currentUser, {
          displayName: newUser.displayName
        }).then(() => {
          // actual creation occurs in handleCreatingNewUser via handleChooseAvatar
          setAvatarChoiceModalShowing(true);
        }).catch((error) => {
          console.log('profile not updated :(');
        });
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  }

  async function handleChooseAvatar(newSheetCoords) {
    if (auth.currentUser) {
      console.warn('running handleChooseAvatar with auth.currentUser');
      const newUserData = {
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        imagePath: 'images/avatarsheetlq.jpg',
        sheetCoords: newSheetCoords,
        id: auth.currentUser.uid,
      };
      console.log('newUserData');
      console.table(newUserData);
      await handleCreatingNewUser(newUserData);
    } else {
      console.warn('running handleChooseAvatar AS GUEST');
      const guestUser = { ...user, sheetCoords: newSheetCoords };
      setUser(guestUser);
    }

    setAvatarChoiceModalShowing(false);
    setPhase('game-mode-select');
  }

  async function handleCreatingNewUser(newUserData) {
    // create a doc in userData with same ID as user
    await setDoc(doc(db, "userData", newUserData.id), newUserData);
    setUser(newUserData);
    console.log('auth.currentUser', auth.currentUser);
    console.log('user is now', user);
  }

  function handleClickPlay() {
    setPhase('game-mode-select')
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

  function handleClickLogOut() {
    signOut(auth)
      .then(function () {
        console.log("You have successfully signed out!");
        setUser({
          email: '',
          displayName: '',
          imagePath: 'images/avatarsheetlq.jpg',
          sheetCoords: { x: 0, y: 0 },
        });
      }).catch(function (error) {
        console.log(`There was an error signing out: ${error.message}!`);
      });
  }

  function handleToggleProfileMenu() {
    setProfileMenuOpen(!profileMenuOpen);
  }


  return (
    <StyledApp style={{
      opacity: loaded ? '1' : '0',
      scale: loaded ? '1' : '0.75'
    }}>
      <Header
        currentUser={auth.currentUser}
        {...user}
        phase={phase}
        profileMenuOpen={profileMenuOpen}
        onClickProfileMenu={handleToggleProfileMenu}
      />
      {(userLoggedIn || user.displayName === 'Guest') &&
        <UserProfileDisplay
          open={profileMenuOpen}
          userLoggedIn={userLoggedIn}
          currentUser={auth.currentUser}
          {...user}
          phase={phase}
          onClickLogOut={handleClickLogOut}
        />
      }
      <TitleScreen
        userLoggedIn={userLoggedIn}
        user={user}
        showing={phase === 'title'}
        handleClickLogIn={handleClickLogIn}
        handleClickPlay={handleClickPlay}
        onClickLogOut={handleClickLogOut}
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
      {phase === 'game-board-showing' &&
        <GameScreen
          showing={phase === 'game-board-showing'}
          user={{ ...user }}
          opponent={{ ...opponent }}
        />
      }
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
