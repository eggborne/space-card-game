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
import { v4 } from 'uuid';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { collection, query, where, doc, setDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { characters, randomOpponents, defaultOpponent } from '../../characters.js';
import { randomInt, pause } from '../../util.js';
import NameGenerator from '../../namegenerator.js';
import DeckCreationScreen from '../DeckCreationScreen/DeckCreationScreen';
import OpponentSelectionScreen from '../OpponentSelectionScreen/OpponentSelectionScreen';
import HallOfFameScreen from '../HallOfFameScreen/HallOfFameScreen';
import MoveIndicator from '../GameScreen/MoveIndicator';
import LoadingIndicator from '../LoadingIndicator';
import SaveIndicator from '../SaveIndicator';
import { game } from '../../game';

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
  background-size: cover;
  background-position: center;
  background-image: url(../public/images/starfieldframe.png);

  & .scroll-container {
    width: 100%;
    overflow-y: auto;
    padding-bottom: var(--footer-height);
  }
`;

function App() {
  const defaultUITheme = {
    name: '',
    '--menu-color': '#8b0000',
    '--secondary-color': '#184738',
    '--menu-border-color': '#000000',
    '--border-radius': '1',
    '--menu-border-width': '0.5',
    '--portrait-border-radius': '50',
  };

  const defaultUserState = {
    email: '',
    displayName: '',
    imagePath: 'images/avatarsheethq.jpg',
    sheetCoords: { x: 0, y: 0 },
    deck: [],
    startingCards: [
      { value: 1, id: '999' },
      { value: 2, id: '998' },
      { value: 3, id: '997' },
      { value: 4, id: '996' },
      { value: 5, id: '995' },
      { value: -1, id: '993' },
      { value: -2, id: '992' },
      { value: -3, id: '991' },
      { value: -4, id: '990' },
      { value: -5, id: '989' },

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
        { value: -7, id: '986', won: true },
        { value: 8, id: '987', won: true },
        { value: 7, id: '985', won: true },
      ],
    },
    preferences: {
      appliedUITheme: defaultUITheme,
    },
    messages: [],
  };

  const defaultOpponentState = {
    ...defaultOpponent,
    imagePath: 'images/opponentsheethq.jpg',
    sheetCoords: { x: randomInt(0, 7), y: randomInt(0, 2) },
  };

  const initialGameState = game;

  const [recentlySaved, setRecentlySaved] = useState(false);
  const [busyLoggingIn, setBusyLoggingIn] = useState(false);
  const [busyRegistering, setBusyRegistering] = useState(false);
  const [busyGettingUsers, setBusyGettingUsers] = useState(false);
  const [returningUserChecked, setReturningUserChecked] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [uiThemes, setUIThemes] = useState({ public: [], private: [] });
  const [phase, setPhase] = useState('title');
  const [gameMode, setGameMode] = useState('Campaign');
  const [logOutModalShowing, setLogOutModalShowing] = useState(false);
  const [user, setUser] = useState(defaultUserState);
  const [opponent, setOpponent] = useState(defaultOpponentState);
  const [avatarChoiceModalShowing, setAvatarChoiceModalShowing] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentGame, setCurrentGame] = useState(initialGameState);
  const [moveIndicatorShowing, setMoveIndicatorShowing] = useState({
    player: undefined,
    message: undefined,
  });
  const [badCredentials, setBadCredentials] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    } else {
      if (!document.getElementById('starfield').classList.contains('showing')) {
        document.getElementById('starfield').play();
        document.getElementById('starfield').classList.add('showing');
      }
    }
  }, [loaded]);

  auth.onAuthStateChanged(async (alreadyLoggedIn) => {
    if (!!alreadyLoggedIn !== userLoggedIn) { //
      if (user.email === '' && !userLoggedIn) {
        setUserLoggedIn(!!alreadyLoggedIn);
        if (alreadyLoggedIn) {
          await setUserDataForId(alreadyLoggedIn.uid);
        }
      } else {
        console.log('user just logged out! --------------------------------------------------');
        // setUserLoggedIn(false);
        // const guestTheme = {appliedUITheme: defaultUITheme};
        // applyUserPreferences(guestTheme)
      }
    }
    if (!alreadyLoggedIn && !userLoggedIn) {
      if (!returningUserChecked) {
        setReturningUserChecked(true);
      }
    }
  });

  function applyUserPreferences(newPreferences = user.preferences, retrievedData = user) {
    const menuColor = newPreferences.appliedUITheme['--menu-color'];
    const menuBorderColor = newPreferences.appliedUITheme['--menu-border-color'];
    const secondaryColor = newPreferences.appliedUITheme['--secondary-color'];
    const menuBorderWidth = newPreferences.appliedUITheme['--menu-border-width'];
    const roundness = newPreferences.appliedUITheme['--border-radius'];
    const portraitRoundness = newPreferences.appliedUITheme['--portrait-border-radius'];

    ROOT.style.setProperty('--menu-color', menuColor);
    ROOT.style.setProperty('--menu-border-color', menuBorderColor + '44');
    ROOT.style.setProperty('--secondary-color', secondaryColor);
    ROOT.style.setProperty('--menu-border-width', menuBorderWidth + 'rem');
    ROOT.style.setProperty('--border-radius', roundness + 'rem');
    ROOT.style.setProperty('--portrait-border-radius', portraitRoundness + '%');

    document.querySelector('meta[name="theme-color"]').setAttribute('content', menuColor);

    setUser(retrievedData);
    if (!returningUserChecked) {
      setReturningUserChecked(true);
    }
  }

  async function setUserDataForId(uid) {
    console.log('Setting user data for id', uid);
    const docRef = doc(db, "userData", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.warn('SETTING RETRIEVED DB USERDATA FOR USER!! --------------------', docSnap.data().displayName);
      const retrievedData = docSnap.data();
      applyUserPreferences(retrievedData.preferences, retrievedData);

    } else {
      console.error("No such userData document!");
    }
  }

  async function getEmailForUsername(username) {
    const q = query(collection(db, "userData"), where("displayName", "==", username));
    const querySnapshot = await getDocs(q);
    let result;
    querySnapshot.forEach((doc) => { // this needs to acknowledge if it finds multiple users with same displayName (calling func should try each one?)
      result = doc.data().email;
    });
    return result;
  }

  function handleClickLogIn(incomingUser) {
    console.log('handleClickLogIn', incomingUser);
    if (incomingUser.password) {
      setBusyLoggingIn(true);
      signInWithEmailAndPassword(auth, incomingUser.email, incomingUser.password)
        .then(async (userCredential) => {
          console.log(`You've successfully signed in as ${userCredential.user.email}!`);
          await setUserDataForId(userCredential.user.uid);
          setPhase('game-mode-select');
          setBusyLoggingIn(false);
        })
        .catch(async (error) => {
          console.log(`Email ${incomingUser.email} not found: ${error.message}!`);
          const userEmail = await getEmailForUsername(incomingUser.email);
          signInWithEmailAndPassword(auth, userEmail, incomingUser.password)
            .then(async (userCredential) => {
              console.log(`You've successfully signed in as ${userCredential.user.email}!`);
              await setUserDataForId(userCredential.user.uid);
              setPhase('game-mode-select');
              setBusyLoggingIn(false);
            })
            .catch((error) => {
              console.log(`Neither email nor username found! ${error.message}!`);
              document.getElementById('password-input').value = '';
              setBusyLoggingIn(false);
              setBadCredentials(true);
              // try other users with same username, if they exist?
            });
        });
    } else {
      console.warn('----------------- user is GUEST');
      setUser({
        ...user,
        email: 'guest@guest.guest',
        displayName: user.displayName,
        imagePath: 'images/avatarsheethq.jpg',
      });
      setAvatarChoiceModalShowing(true);
    }
  }

  async function handleClickRegister(newUser) {
    setBusyRegistering(true);
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCredential) => {
        // User successfully signed up 
        updateProfile(auth.currentUser, {
          displayName: newUser.displayName
        }).then(() => {
          // actual creation occurs in handleCreatingNewUser via handleChooseAvatar
          setAvatarChoiceModalShowing(true);
          setBusyRegistering(false);
        }).catch((error) => {
          console.log('profile not updated :(', error);
        });
      })
      .catch((error) => {
        console.log('ERROR REGISTERING:', error);
      });
  }

  async function handleChooseAvatar(newSheetCoords, guestName) {
    if (auth.currentUser) {
      const newUserData = {
        ...user,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        imagePath: 'images/avatarsheethq.jpg',
        sheetCoords: newSheetCoords,
        id: auth.currentUser.uid,
      };
      await handleCreatingNewUser(newUserData);
    } else {
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
    const newUserData = { ...user };
    await updateDoc(doc(db, "userData", newUserData.id), {
      deck: newValue
    });
    setUser(newUserData);
  }

  async function flashSavedMessage(duration) {
    setRecentlySaved(true);
    await pause(duration);
    setRecentlySaved(false);
  }

  async function handleUpdatingAppliedTheme(newValue, guest) {
    console.warn('applying ui theme!', newValue);
    const newUserData = { ...user };
    newUserData.preferences.appliedUITheme = newValue;
    if (!guest) {
      await updateDoc(doc(db, "userData", newUserData.id), newUserData);
      if (!recentlySaved) {
        flashSavedMessage(500);
      }
    }
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

  async function handleClickHallOfFame() {
    await getUsers();
    setPhase('hall-of-fame');
  }

  function getRandomCharacterOpponent() {
    const randomX = randomInt(0, 7);
    const characterData = Object.values(randomOpponents)[randomX];
    return {
      ...characterData,
      imagePath: 'images/randomcharactersheethq.jpg',
      sheetCoords: { x: randomX, y: 2 },
    };
  }

  function getRandomNamedOpponent() {
    const randomX = randomInt(0, 7);
    const characterData = { ...defaultOpponent };
    const randomName = nameGenerator.getName().fullName;
    return {
      ...characterData,
      displayName: randomName,
      imagePath: 'images/randomcharactersheethq.jpg',
      sheetCoords: { x: randomX, y: 0 },
    };
  }

  function handleAcceptGameMode() {
    setProfileMenuOpen(false);
    if (gameMode === 'Campaign') {
      setPhase('deck-selection');
    } else if (gameMode === 'Quick Match') {
      const randomOpponent = randomInt(0, 10) ? getRandomNamedOpponent() : getRandomCharacterOpponent();
      setOpponent(randomOpponent);
      startGame();
    }
  }

  function deckHasCardWithId(id) {
    return user.deck.filter(card => card.id === id).length > 0;
  }

  async function handleConfirmDeck() {
    const chosenDeck = [...user.deck];
    if (chosenDeck.length < 10) {
      const randomNeeded = 10 - chosenDeck.length;
      const remainingCards = [...defaultUserState.startingCards].filter(card => !deckHasCardWithId(card.id));
      for (let i = 0; i < randomNeeded; i++) {
        const randomIndex = randomInt(0, remainingCards.length - 1);
        const randomCard = remainingCards[randomIndex];
        chosenDeck.push(randomCard);
        remainingCards.splice(randomIndex, 1);
      }
    }

    const newUser = { ...user };
    newUser.deck = chosenDeck;
    setUser(newUser);

    if (userLoggedIn) {
      handleUpdatingUserDeck(chosenDeck);
    }

    setPhase('opponent-selection');
  }

  function handleCloseAvatarModal() {
    setAvatarChoiceModalShowing(false);
  }

  async function handleConfirmLogOut() {
    signOut(auth)
      .then(async function () {
        console.log("You have successfully signed out!");
        window.location.reload(); // Guest user overrwrote prevously-logged-in user's displayName and email ??
        // setUser(defaultUserState);
        // setUserLoggedIn(false);
        // setLogOutModalShowing(false);
        // setProfileMenuOpen(false);
        // applyUserPreferences();
        // setPhase('title'); 
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
    const newUserDeck = remove ? [...user.deck].filter(card => card !== cardObj) : [...user.deck, cardObj];
    const newUser = { ...user };
    newUser.deck = newUserDeck;
    setUser(newUser);
  }

  function handleSelectOpponent(newOpponent) {
    const mergedOpponent = { ...opponent, ...newOpponent };
    setOpponent(mergedOpponent);
  }

  function handleConfirmOpponent() {
    if (opponent.displayName === '') { // user did not change from Jar Jar
      const defaultFirstOpponent = { ...opponent, ...characters['jarjarbinks'] };
      defaultFirstOpponent.sheetCoords = { x: 0, y: 0 };
      setOpponent(defaultFirstOpponent);
    }
    startGame();
  }

  async function startGame() {
    console.warn('---------------- GAME STARTED ----------------');
    const newUser = { ...user };
    const userRandomCards = newUser.startingCards.sort(() => 0.5 - Math.random()).slice(0, 4);
    const opponentRandomCards = newUser.startingCards.sort(() => 0.5 - Math.random()).slice(0, 4);

    currentGame.userStatus.hand = userRandomCards;
    currentGame.opponentStatus.hand = opponentRandomCards;
    currentGame.gameStarted = true;
    setCurrentGame(currentGame);

    setPhase('game-board-showing');
    await pause(4500); // total time for versus screen to show and game board to zoom in? should be 2750??
    console.warn('>>>>>>>>> READY TO DEAL');
    setGameStarted(true);
    currentGame.dealCard();
  }

  async function handleSavingTheme(newThemeName) {
    const newThemeDoc = {
      ...user.preferences.appliedUITheme,
      creatorId: user.id,
      name: newThemeName,
      public: true,
    };

    const dbRef = doc(db, 'uiThemes', v4());
    await setDoc(dbRef, newThemeDoc);
    flashSavedMessage(1000);
  }

  async function getUIThemes() {
    const q = query(collection(db, "uiThemes"));
    const querySnapshot = await getDocs(q);
    const newThemes = [];
    querySnapshot.forEach((doc) => {
      const themeObj = { ...doc.data(), id: doc.id };
      newThemes.push(themeObj);
    });
    for (let i = 0; i < newThemes.length; i++) {
      const fullCreatorData = await getUserById(newThemes[i].creatorId);
      newThemes[i].creatorData = {
        id: fullCreatorData.id,
        displayName: fullCreatorData.displayName,
        imagePath: fullCreatorData.imagePath,
        sheetCoords: fullCreatorData.sheetCoords,
      };
    }
    setUIThemes(newThemes);
  }

  async function getUsers() {
    setBusyGettingUsers(true);
    const q = query(collection(db, "userData"));
    const querySnapshot = await getDocs(q);
    const newUserList = [];
    querySnapshot.forEach((doc) => {
      const userObj = { ...doc.data(), id: doc.id };
      newUserList.push(userObj);
    });
    setUserList(newUserList);
    setBusyGettingUsers(false);
  }

  async function getUserById(id) {
    const q = query(collection(db, "userData"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let foundUserData;
    querySnapshot.forEach((doc) => {
      foundUserData = doc.data();
    });
    return foundUserData;
  }

  function handleClickEndGame() {
    setHamburgerOpen(false);
    document.getElementById('starfield').play();
    setMoveIndicatorShowing({
      player: undefined,
      message: undefined,
    });
    setCurrentGame(initialGameState);
    setGameStarted(false);
    setPhase('title');
  }

  function handlePlayingCard() {
    currentGame.playCard(currentGame.selectedCard);
    setCurrentGame({ ...currentGame });
  }

  async function handleClickEndTurn() {
    if (currentGame.selectedCard) {
      currentGame.selectedCard = undefined;
    }
    const endingPlayer = currentGame.currentTurn;
    flashMoveIndicator(endingPlayer, 'END TURN');
    await pause(1000);
    currentGame.currentTurn = endingPlayer === 'user' ? 'opponent' : 'user';
    currentGame.turnPhase = 'waiting';
    setCurrentGame({ ...currentGame });
    currentGame.dealCard();
    await pause(500);
    if (currentGame.currentTurn === 'opponent') {
      if (currentGame.opponentStatus.hand.length) {
        const standAt = opponent.strategy.stand.standAt;
        if (currentGame.opponentStatus.matchScore > 20) {
          console.warn('//////////////////////////////// BUSTED /////////////////////////////////////////////');
          flashMoveIndicator('opponent', 'BUST :(', true);
        } else if (currentGame.opponentStatus.matchScore < standAt) {
          console.warn('*********** CPU IS PLAYING BEST CARD due to score', currentGame.opponentStatus.matchScore, 'being < standAt', standAt);
          currentGame.playBestCPUCard();
          await pause(1000);
        } else {
          console.warn('*********** CPU IS STANDING due to score', currentGame.opponentStatus.matchScore, 'being >= standAt', standAt);
          return handleClickStand();
        }
      }
      setCurrentGame({ ...currentGame });
      const playerBusted = currentGame.opponentStatus.matchScore > 20;
      if (!playerBusted) {
        await pause(500);
        handleClickEndTurn();
      } else {

      }
    }
  }

  function handleSelectingCard(card) {
    const newCurrentGame = { ...currentGame };
    newCurrentGame.selectedCard = card;
    setCurrentGame(newCurrentGame);
  }

  function handleClickStand() {
    console.warn('clicked STAND!');
    const standingPlayer = currentGame.currentTurn;
    flashMoveIndicator(standingPlayer, 'STAND', true);
    currentGame.turnPhase = 'other-player-stood';
    currentGame.currentTurn = currentGame.currentTurn === 'user' ? 'opponent' : 'user';
    setCurrentGame({ ...currentGame });
  }

  async function flashMoveIndicator(player, message, persist) {
    setMoveIndicatorShowing({ player, message });
    if (!persist) {
      await pause(1000);
      setMoveIndicatorShowing({
        player: undefined,
        message,
      });
      // await pause(200);
      // setMoveIndicatorShowing({
      //   player: undefined,
      //   message: undefined,
      // });
    }
  }

  return (
    <>
      {loaded && <video id='starfield' loop={true} muted={true}>
        <source src="/images/starfield.mp4" type="video/mp4" />
      </video>}
      <SaveIndicator legend="SAVED!" showing={recentlySaved} />
      {phase !== 'game-board-showing' &&
        <>
          <LoadingIndicator legend='LOADING...' showing={!returningUserChecked} location='page-load' />
          <LoadingIndicator legend='LOGGING IN...' showing={busyLoggingIn} location='log-in' />
          <LoadingIndicator legend='CREATING ACCOUNT...' showing={busyRegistering} location='register' />
          <LoadingIndicator legend='LOADING USERS...' showing={busyGettingUsers} location='get-users' />
        </>
      }
      <StyledApp style={{
        opacity: returningUserChecked ? '1' : '0',
        scale: returningUserChecked ? '1' : '0.75'
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
          {(phase !== 'title' && userLoggedIn) &&
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
            badCredentials={badCredentials}
            showing={phase === 'title'}
            busyLoggingIn={busyLoggingIn}
            clearCredentialsWarning={() => setBadCredentials(false)}
            handleClickLogIn={handleClickLogIn}
            handleClickPlay={handleClickPlay}
            handleClickOptions={handleClickOptions}
            handleClickHallOfFame={handleClickHallOfFame}
            onClickLogOut={handleClickLogOut}
            handleClickRegister={handleClickRegister}
            handleChooseAvatar={handleChooseAvatar}
            avatarChoiceModalShowing={avatarChoiceModalShowing}
            setAvatarChoiceModalShowing={() => setAvatarChoiceModalShowing(true)}
            handleCloseAvatarModal={handleCloseAvatarModal}
            getName={nameGenerator.getName}
          />
          <OptionsScreen
            showing={phase === 'options'}
            user={user}
            userLoggedIn={userLoggedIn}
            uiThemes={uiThemes}
            handleUpdatingAppliedTheme={handleUpdatingAppliedTheme}
            handleSavingTheme={handleSavingTheme}
            getUIThemes={getUIThemes}
            applyUserPreferences={applyUserPreferences}
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
          <HallOfFameScreen
            showing={phase === 'hall-of-fame'}
            userList={userList}
          />
          {phase === 'game-board-showing' &&
            <>
              <MoveIndicator
                player={'opponent'}
                showing={moveIndicatorShowing.player === 'opponent'}
                message={moveIndicatorShowing.message}
              />
              <MoveIndicator
                player={'user'}
                showing={moveIndicatorShowing.player === 'user'}
                message={moveIndicatorShowing.message}
              />
              <GameScreen
                showing={phase === 'game-board-showing'}
                gameStarted={gameStarted}
                hamburgerOpen={hamburgerOpen}
                currentGame={currentGame}
                user={user}
                opponent={opponent}
                handleUpdatingAppliedTheme={handleUpdatingAppliedTheme}
                handleSelectingCard={handleSelectingCard}
                onClickEndGame={handleClickEndGame}
                playCard={handlePlayingCard}
              />
            </>
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
          currentTurn={currentGame.currentTurn}
          handleToggleHamburger={handleToggleHamburger}
          hamburgerOpen={hamburgerOpen}
          onClickEndTurn={handleClickEndTurn}
          onClickStand={handleClickStand}
          flashMoveIndicator={flashMoveIndicator}
        />
      </StyledApp>
    </>
  );
}

export default App;
