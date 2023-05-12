import PropTypes from 'prop-types';
import styled from 'styled-components';
import OptionsDisplay from '../OptionsDisplay';
import Button from '../Buttons/Button';
import ThemeSelectModal from './ThemeSelectModal';
import { useEffect, useState } from 'react';
import SaveThemeModal from './SaveThemeModal';
import ScreenVeil from '../ScreenVeil';

const StyledOptionsScreen = styled.div`
  position: absolute;
  top: calc(var(--header-height) + (var(--main-padding) / 2));
  left: 0;
  // margin-top: var(--header-height);
  
  background-color: var(--secondary-color);
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;
  border-radius: var(--border-radius);
  width: var(--main-width);

  opacity: 1;
  scale: 1;
  pointer-events: all;

  transition: all 300ms ease-out;

  & .option-section {
    position: relative;
    padding: 2.5rem 0;
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
    }
  }
  
  & > .scroll-container {
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(var(--actual-height) - var(--expanded-footer-height) - var(--header-height) - (var(--main-padding)));

    & > h1, > h4 {
      text-align: center;
      padding-bottom: 1rem;
    }
    
    & > h4 {
      color: #aaa;
      & > span {
        color: lightgreen;
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
    border-color: var(--inner-shade-color);
  }

 
  
  &.hidden {
    pointer-events: none;
    opacity: 0;
    scale: 0.9;
    transition-: 0ms;
  }
`;

function OptionsScreen(props) {
  console.log('OptionsScreen props: ', props);
  const [themeSelectModalShowing, setThemeSelectModalShowing] = useState(false);
  const [saveThemeModalShowing, setSaveThemeModalShowing] = useState(false);

  function handleSubmitSaveThemeForm(newThemeName) {
    setSaveThemeModalShowing(false);
    props.handleSavingTheme(newThemeName);
  }
  
  async function handleClickBrowseThemes() {
    await props.getUIThemes();
    setThemeSelectModalShowing(true);
  }

  return (
    <StyledOptionsScreen
      className={props.showing ? '' : ' hidden'}
    >
      <ScreenVeil showing={themeSelectModalShowing || saveThemeModalShowing} />
      <div className='scroll-container'>
        <h1>Options</h1>
        <section className='option-section'>
          <h4 className='section-label'>User Interface</h4>
          {props.user.preferences.appliedUITheme.name && <h4>using theme <span>{props.user.preferences.appliedUITheme.name}</span></h4>}
          <OptionsDisplay ui={props.user.preferences.appliedUITheme} />
          <div className='theme-button-area'>
            <Button onClick={handleClickBrowseThemes} color='orange' label='Browse themes' />
            <Button onClick={() => setSaveThemeModalShowing(true)} color='green' label='Save theme...' />
          </div>
        </section>
      </div>
      <ThemeSelectModal uiThemes={props.uiThemes} showing={themeSelectModalShowing} onClickOK={() => setThemeSelectModalShowing(false)} onClickCancel={() => setThemeSelectModalShowing(false)} />
      <SaveThemeModal showing={saveThemeModalShowing} onClickOK={handleSubmitSaveThemeForm} onClickCancel={() => setSaveThemeModalShowing(false)} />
    </StyledOptionsScreen>
  );
}

OptionsScreen.propTypes = {
  showing: PropTypes.bool,
  user: PropTypes.object,
  opponent: PropTypes.object,
  gameMode: PropTypes.string,
  getUIThemes: PropTypes.func,
  uiThemes: PropTypes.object,
  handleSavingTheme: PropTypes.func,
};

export default OptionsScreen;