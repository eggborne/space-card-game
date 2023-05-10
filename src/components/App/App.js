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
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { characters, randomOpponents, defaultOpponent } from '../../characters.js';
import { randomInt, pause } from '../../util.js';
import NameGenerator from '../../namegenerator.js';
import DeckCreationScreen from '../DeckCreationScreen/DeckCreationScreen';
import OpponentSelectionScreen from '../OpponentSelectionScreen/OpponentSelectionScreen';

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

  const defaultUserState = {
    email: '',
    displayName: '',
    imagePath: 'images/avatarsheetlq.jpg',
    sheetCoords: { x: 0, y: 0 },
    deck: [],
    startingCards: [
      { value: 1, id: '999'},
      { value: 2, id: '998'},
      { value: 3, id: '997'},
      { value: 4, id: '996'},
      { value: 5, id: '995'},
      { value: -1, id: '993'},
      { value: -2, id: '992'},
      { value: -3, id: '991'},
      { value: -4, id: '990'},
      { value: -5, id: '989'},
      
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
      wonCards: [
        { value: -7, id: '986'},
        { value: 8, id: '987'},
        { value: 7, id: '985'},
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
  const [gameMode, setGameMode] = useState('Campaign');
  const [logOutModalShowing, setLogOutModalShowing] = useState(false);
  const [user, setUser] = useState(defaultUserState);
  const [opponent, setOpponent] = useState(defaultOpponentState);
  const [avatarChoiceModalShowing, setAvatarChoiceModalShowing] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const [currentGame, setCurrentGame] = useState({
    user: {
      hand: [],
      matchScore: 0,
      setsWon: 0,
    },
    opponent: {
      hand: [],
      matchScore: 0,
      setsWon: 0,
    },
    turnPhase: 'waiting',
  });

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    } else {
      document.getElementById('starfield').play();
    }
  }, [loaded]);

  auth.onAuthStateChanged(async (alreadyLoggedIn) => {
    if (!!alreadyLoggedIn !== userLoggedIn) {
      setUserLoggedIn(!!alreadyLoggedIn);
      if (user.email === '') {
        console.warn('setting userData on auth state change');
        await setUserDataForId(alreadyLoggedIn.uid);
      }
    }
  });

  async function setUserDataForId(uid) {
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.warn('SETTING RETRIEVED DB USERDATA FOR USER!! --------------------', docSnap.data().displayName);
      return setUser(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such userData document!");
    }
  }

  function handleClickLogIn(incomingUser) {
    console.warn('handleClickLogin got user');
    console.table(incomingUser);
    console.log(user);
    if (incomingUser.password) {
      console.log('--- user used password');
      signInWithEmailAndPassword(auth, incomingUser.email, incomingUser.password)
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
        ...user,
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
  }

  async function handleUpdatingUserDeck(newValue) {
    const newUserData = {...user};
    await updateDoc(doc(db, "userData", newUserData.id), {
      deck: newValue
    });
    // await setDoc(doc(db, "userData", newUserData.id), newUserData);
    setUser(newUserData);
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
      setPhase('deck-selection');
    } else if (gameMode === 'Quick Match') {
      const randomOpponent = randomInt(0, 5) ? getRandomNamedOpponent() : getRandomCharacterOpponent();
      console.log('GOT RANDOM OPPONENT ////////////////');
      console.table(randomOpponent);
      setOpponent(randomOpponent);
      setPhase('game-board-showing');
    }
  }

  function deckHasCardWithId(id) {
    return user.deck.filter(card => card.id === id).length > 0;
  }

  async function handleConfirmDeck() {
    const chosenDeck = [...user.deck];
    if (chosenDeck.length < 10) {
      const randomNeeded = 10 - chosenDeck.length;
      const remainingCards = [...defaultUserState.startingCards].filter(card => !deckHasCardWithId(card.id) );
      for (let i = 0; i < randomNeeded; i++) {
        const randomIndex = randomInt(0, remainingCards.length - 1);
        const randomCard = remainingCards[randomIndex];
        console.log(randomCard)
        chosenDeck.push(randomCard);
        remainingCards.splice(randomIndex, 1);
      }
    }
    // const newCurrentGame = {...currentGame};
    // newCurrentGame.user.deck = chosenDeck;
    // setCurrentGame(newCurrentGame);

    const newUser = {...user};
    newUser.deck = chosenDeck;
    setUser(newUser);

    if (userLoggedIn) {
      handleUpdatingUserDeck(chosenDeck);
    }

    setPhase('opponent-selection')
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
        setPhase('title');
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

  function handleAddCardToDeck(cardObj, remove) {
    console.warn(remove ? 'adding to deck!' : 'removeing from deck!');
    console.table(cardObj);
    const newUserDeck = remove ? [...user.deck].filter(card => card !== cardObj) : [...user.deck, cardObj];
    const newUser = {...user};
    newUser.deck = newUserDeck;
    setUser(newUser);
  }

  function handleSelectOpponent(newOpponent) {
    console.log('handlesel got arg')
    console.log(newOpponent);
    console.log('handlesel maybe merge state.opponent?')
    console.log(opponent);
    const mergedOpponent = { ...opponent, ...newOpponent };
    console.log('handlesel mergedOpponent is');
    console.log(mergedOpponent);
    setOpponent(mergedOpponent);
  }

  function handleConfirmOpponent() {
    setPhase('game-board-showing')

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
          {phase !== 'title' && 
            <DeckCreationScreen
              showing={phase === 'deck-selection'}
              user={user}
              cardSelection={[...user.startingCards, ...user.progress.wonCards]}
              currentGame={currentGame}
              onAddCardToDeck={handleAddCardToDeck}
            />
          }
          <OpponentSelectionScreen
            showing={phase === 'opponent-selection'}
            characters={characters}
            onSelectOpponent={handleSelectOpponent}
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
          onClickBackToDeckSelect={() => setPhase('deck-selection')}
          onClickConfirmDeck={handleConfirmDeck}
          onClickConfirmOpponent={handleConfirmOpponent}
          userDeck={user.deck}
          handleToggleHamburger={handleToggleHamburger}
          hamburgerOpen={hamburgerOpen}
        />
      </StyledApp>
    </>
  );
}

export default App;
