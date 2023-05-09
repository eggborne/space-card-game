import { useState, useEffect } from 'react';
import Header from '../Header';
import HeaderMenu from '../HeaderMenu';
import Footer from '../Footer';
import TitleScreen from '../TitleScreen/TitleScreen';
import GameModeSelectScreen from '../GameModeSelectScreen/GameModeSelectScreen';
import GameScreen from '../GameScreen/GameScreen';
import OptionsScreen from '../OptionsScreen/OptionsScreen';
import Modal from '../Modal';
import ScreenVeil from '../ScreenVeil';
import styled from 'styled-components';
import { db, auth } from '../../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { characters, randomOpponents, defaultOpponent } from '../../characters.js';
import { randomInt, pause } from '../../util.js';
import NameGenerator from '../../namegenerator.js';

let clickFunction = window.PointerEvent ? 'onPointerDown' : window.TouchEvent ? 'onTouchStart' : 'onClick';

console.error('USING CLICK -------', clickFunction, ' ------------------------');

const ROOT = document.documentElement;
const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
const RULES = {
  cardRatio: {
    min: 1.475,
    max: 1.525
  }
};

console.table(characters);
console.table(randomOpponents);

const nameGenerator = new NameGenerator();
nameGenerator.getRules();

const StyledApp = styled.main`
  position: relative;
  color: #ddd;
  width: var(--main-width);
  height: var(--actual-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 500ms ease;
  overflow: hidden;

  & .scroll-container {
    width: 100%;
    overflow-y: auto;
    padding-bottom: var(--footer-height);
  }
`;

function App() {

  auth.onAuthStateChanged(async (alreadyLoggedIn) => {
    if (!!alreadyLoggedIn !== userLoggedIn) {
      setUserLoggedIn(!!alreadyLoggedIn);
      if (user.email === '') {
        console.warn('setting userData on auth state change');
        await setUserDataForId(alreadyLoggedIn.uid);
      }
    }
  });

  const defaultUserState = {
    email: '',
    displayName: '',
    imagePath: 'images/avatarsheetlq.jpg',
    sheetCoords: { x: 0, y: 0 },
    startingCards: [
      { value: 1, },
      { value: 1, },
      { value: 1, },
      { value: 2, },
      { value: 2, },
      { value: 2, },
      { value: 3, },
      { value: 3, },
      { value: 4, },
    ],
    statistics: {
      setWins: 0,
      totalSets: 0,
      matchWins: 0,
      totalMatches: 0,
    },
    progress: {
      credits: 10,
      cpuDefeated: [],
      wonCards: [],
      sideDeck: [ // 10 cards chosen by user before game, 4 are randomly chosen for hand
      ],
    },
    messages: [],
  };

  const defaultOpponentState = {
    displayName: '',
    imagePath: 'images/opponentsheet.jpg',
    sheetCoords: { x: randomInt(0, 7), y: randomInt(0, 2) },
  };

  const [loaded, setLoaded] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Quick Match');
  const [logOutModalShowing, setLogOutModalShowing] = useState(false);
  const [user, setUser] = useState(defaultUserState);
  const [opponent, setOpponent] = useState(defaultOpponentState);
  const [avatarChoiceModalShowing, setAvatarChoiceModalShowing] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    } else {
      document.getElementById('starfield').play();
    }
  }, [loaded]);

  async function setUserDataForId(uid) {
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.warn('SETTING DB USERDATA FOR USER!! --------------------', docSnap.data().displayName);
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

  async function handleChooseAvatar(newSheetCoords, guestName) {
    if (auth.currentUser) {
      console.warn('running handleChooseAvatar with auth.currentUser');
      const newUserData = {
        ...user,
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
      const guestUser = { ...user, sheetCoords: newSheetCoords, displayName: guestName };
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
    setPhase('game-mode-select');
  }

  function handleSwitchGameMode(newMode) {
    setGameMode(newMode);
  }

  function handleClickOptions() {
    setPhase('options');
  }

  function getRandomCharacterOpponent() {
    const randomX = randomInt(0, 5);
    const characterData = Object.values(randomOpponents)[randomX];
    return {
      ...characterData,
      imagePath: 'images/opponentsheet.jpg',
      sheetCoords: { x: randomX, y: 3 },
    };
  }

  function getRandomNamedOpponent() {
    const randomX = randomInt(0, 7);
    const characterData = { ...defaultOpponent };
    const randomName = nameGenerator.getName().fullName;
    console.log('RANDOM NAME!', randomName);
    return {
      ...characterData,
      displayName: randomName,
      imagePath: 'images/opponentsheet.jpg',
      sheetCoords: { x: randomX, y: 2 },
    };
  }

  function handleAcceptGameMode() {
    setProfileMenuOpen(false);
    if (gameMode === 'Campaign') {

    } else if (gameMode === 'Quick Match') {
      const randomOpponent = randomInt(0, 5) ? getRandomNamedOpponent() : getRandomCharacterOpponent();
      console.log('GOT RANDOM OPPONENT ////////////////');
      console.table(randomOpponent);
      setOpponent(randomOpponent);
      setPhase('game-board-showing');
    }
  }

  function handleCloseAvatarModal() {
    setAvatarChoiceModalShowing(false);
  }

  function handleConfirmLogOut() {
    signOut(auth)
      .then(function () {
        console.log("You have successfully signed out!");
        setUser(defaultUserState);
        setUserLoggedIn(false);
        setLogOutModalShowing(false);
        setProfileMenuOpen(false);
      }).catch(function (error) {
        console.log(`There was an error signing out: ${error.message}!`);
      });
  }

  function handleClickLogOut() {
    setLogOutModalShowing(true);
  }

  function handleToggleProfileMenu() {
    setProfileMenuOpen(!profileMenuOpen);
  }

  async function handleToggleHamburger() {
    if (hamburgerOpen) {
      setHamburgerOpen(!hamburgerOpen);
      await pause(20);
      document.getElementById('starfield').play();
    } else {
      document.getElementById('starfield').pause();
      await pause(20);
      setHamburgerOpen(!hamburgerOpen);
    }
  }

  function handleClickEndGame() {
    setHamburgerOpen(false);
    document.getElementById('starfield').play();
    setPhase('title');
  }

  return (
    <>
      {loaded && <video id='starfield' loop={true} muted={true}>
        <source src="https://mikedonovan.dev/pazaak/assets/images/starfieldlq.mp4" type="video/mp4" />
      </video>}
      <StyledApp style={{
        opacity: loaded ? '1' : '0',
        scale: loaded ? '1' : '0.75'
      }}>

        <Header
          authUser={auth.currentUser}
          user={user}
          phase={phase}
          profileMenuOpen={profileMenuOpen}
          avatarChoiceModalShowing={avatarChoiceModalShowing}
          onClickProfileMenu={handleToggleProfileMenu}
        />
        <ScreenVeil showing={hamburgerOpen || (logOutModalShowing && userLoggedIn)} onClickClose={hamburgerOpen ? () => setHamburgerOpen(false) : handleCloseAvatarModal} />
        <Modal
          showing={logOutModalShowing && userLoggedIn}
          headline={'Log out?'}
          color='maroon'
          buttonLabel='Do it'
          bodyComponent={<>{user.email}</>}
          onClickOK={handleConfirmLogOut}
          onClickCancel={() => setLogOutModalShowing(false)}
        />
        <div className='scroll-container'>

          {(phase !== 'title' && (userLoggedIn || user.displayName === 'Guest')) &&
            <HeaderMenu
              open={profileMenuOpen}
              userLoggedIn={userLoggedIn}
              currentUser={auth.currentUser}
              user={user}
              phase={phase}
              onClickLogOut={handleClickLogOut}
            />
          }
          <TitleScreen
            userLoggedIn={userLoggedIn}
            user={user}
            authUser={auth.currentUser}
            showing={phase === 'title'}
            handleClickLogIn={handleClickLogIn}
            handleClickPlay={handleClickPlay}
            handleClickOptions={handleClickOptions}
            onClickLogOut={handleClickLogOut}
            handleClickRegister={handleClickRegister}
            handleChooseAvatar={handleChooseAvatar}
            avatarChoiceModalShowing={avatarChoiceModalShowing}
            setAvatarChoiceModalShowing={() => setAvatarChoiceModalShowing(true)}
            handleCloseAvatarModal={handleCloseAvatarModal}
          />
          <OptionsScreen
            showing={phase === 'options'}
          />
          <GameModeSelectScreen
            showing={phase === 'game-mode-select'}
            gameMode={gameMode}
            switchGameMode={handleSwitchGameMode}
          />
          {phase === 'game-board-showing' &&
            <GameScreen
              showing={phase === 'game-board-showing'}
              hamburgerOpen={hamburgerOpen}
              user={{ ...user }}
              opponent={{ ...opponent }}
              onClickEndGame={handleClickEndGame}
            />
          }
        </div>
        <Footer
          phase={phase}
          onClickBackToTitle={() => setPhase('title')}
          onClickBackToGameSelect={() => setPhase('game-mode-select')}
          onClickAcceptGameMode={handleAcceptGameMode}
          handleToggleHamburger={handleToggleHamburger}
          hamburgerOpen={hamburgerOpen}
        />
      </StyledApp>
    </>
  );
}

export default App;
