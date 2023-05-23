import PropTypes from 'prop-types';
import styled from 'styled-components';
import OptionsDisplay from '../OptionsDisplay';
import Button from '../Buttons/Button';
import ThemeSelectModal from './ThemeSelectModal';
import { useEffect, useState } from 'react';
import SaveThemeModal from './SaveThemeModal';
import ScreenVeil from '../ScreenVeil';
import LoadingIndicator from '../LoadingIndicator';

const StyledOptionsScreen = styled.div`
  position: absolute;
  top: calc(var(--header-height) + (var(--main-padding) / 2));
  left: 0;
  background-color: var(--secondary-color);
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;
  border-radius: var(--border-radius);
  width: var(--main-width);
  height: calc(var(--actual-height) - var(--expanded-footer-height) - var(--header-height) - var(--main-padding));
  opacity: 1;
  scale: 1;
  pointer-events: all;
  text-shadow: -1px 0px 0 #00000066, 0px -1px 0 #00000066, -0px 1px 0 #00000066, 0px 1px 0 #00000066;

  transition: all 300ms ease-out;

  & .option-section {
    position: relative;
    padding-bottom: 2.5rem;
    border: 0.1rem solid #ffffff44;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .section-label {
      font-weight: normal;
      background-color: var(--secondary-color);
      border-radius: var(--border-radius);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 0.75rem;
      width: max-content;
    }
  }
  
  & > .scroll-container {
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(var(--actual-height) - var(--expanded-footer-height) - var(--header-height) - (var(--main-padding)));

    & > h1, h4 {
      text-align: center;
      padding-bottom: 1rem;
    }
    
    & h4 {
      font-weight: normal;
      & > div {
        margin: 0.25rem;
        color: lightgreen;
        font-size: 1.25rem;
      }
    }
  
    & .theme-button-area {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
  
      & > button {
        min-width: 60%;
      }
      
    }
  }

  & input {
    cursor: pointer;
    border-color: var(--menu-border-color);
  }

  &.hidden {
    pointer-events: none;
    opacity: 0;
    scale: 0.9;
    transition-: 0ms;
  }
`;

function OptionsScreen(props) {
  const [themeSelectModalShowing, setThemeSelectModalShowing] = useState(false);
  const [saveThemeModalShowing, setSaveThemeModalShowing] = useState(false);

  function handleSubmitSaveThemeForm(newThemeName) {
    setSaveThemeModalShowing(false);
    props.handleSavingTheme(newThemeName);
  }
  
  async function handleClickBrowseThemes() {
    setThemeSelectModalShowing(true);
    props.getUIThemes();
  }
  const dataReady = !props.uiThemes.public; // not at all the right way
  const ownTheme = props.user.preferences.appliedUITheme.creatorId === props.user.id;

  return (
    <StyledOptionsScreen
      className={props.showing ? 'menu-style' : 'menu-style hidden'}
    >
      {/* <ScreenVeil showing={themeSelectModalShowing || saveThemeModalShowing} /> */}
      <div className='scroll-container'>
        <h1>Options</h1>
        <section style={{ borderColor: props.user.preferences.appliedUITheme['--menu-border-color'] + '44' }} className='option-section'>
          <h3 className='section-label'>User Interface</h3>
          {props.user.preferences.appliedUITheme.name && 
          <h4>using theme 
            <div>{props.user.preferences.appliedUITheme.name}</div>
             by {props.user.preferences.appliedUITheme.creatorData.displayName} {ownTheme && '(you!)'}
            </h4>}
          <OptionsDisplay location='options-screen' user={props.user} ui={props.user.preferences.appliedUITheme} handleUpdatingAppliedTheme={props.handleUpdatingAppliedTheme} />
          <div className='theme-button-area'>
            <Button onClick={handleClickBrowseThemes} color='orange' label='Browse themes' />
            {props.userLoggedIn && <Button onClick={() => setSaveThemeModalShowing(true)} color='green' label='Save theme' />}
          </div>
        </section>
      </div>
      {/* <LoadingIndicator showing={themeSelectModalShowing && !dataReady} /> */}
      <LoadingIndicator 
        showing={themeSelectModalShowing && !dataReady}
        legend='LOADING THEMES...'
        location='theme-select-modal'
      />
      <ThemeSelectModal 
        showing={themeSelectModalShowing}
        dataReady={dataReady}
        userLoggedIn={props.userLoggedIn}
        uid={props.user.id}
        uiThemes={props.uiThemes} 
        applyUserPreferences={props.applyUserPreferences}
        handleUpdatingAppliedTheme={props.handleUpdatingAppliedTheme}
        onClickOK={() => setThemeSelectModalShowing(false)} 
        onClickCancel={() => setThemeSelectModalShowing(false)} 
      />
      <SaveThemeModal showing={saveThemeModalShowing} onClickOK={handleSubmitSaveThemeForm} onClickCancel={() => setSaveThemeModalShowing(false)} />
    </StyledOptionsScreen>
  );
}

OptionsScreen.propTypes = {
  showing: PropTypes.bool,
  userLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  opponent: PropTypes.object,
  gameMode: PropTypes.string,
  getUIThemes: PropTypes.func,
  applyUserPreferences: PropTypes.func,
  uiThemes: PropTypes.object,
  handleUpdatingAppliedTheme: PropTypes.func,
  handleSavingTheme: PropTypes.func,
};

export default OptionsScreen;