import PropTypes from 'prop-types';
import styled from 'styled-components';
import OptionsDisplay from '../OptionsDisplay';
import Button from '../Buttons/Button';
import ThemeSelectModal from './ThemeSelectModal';
import { useState } from 'react';

const StyledOptionsScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2rem;
  margin-top: var(--header-height);
  width: var(--main-width);
  height: calc(var(--actual-height) - var(--expanded-footer-height) - var(--header-height));
  background-color: var(--secondary-color);
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 1rem;

  opacity: 1;
  scale: 1;
  pointer-events: all;

  transition: all 300ms ease-out;

  & input {
    cursor: pointer;
  }

  
  & > h1 {
    text-align: center;
  }

  & > .theme-button-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: flex-end;
    gap: 1rem;
    
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
  const [themeModalShowing, setThemeModalShowing] = useState(false);
  return (
    <StyledOptionsScreen
      // style={{ opacity: props.showing ? '1' : '0.5' }}
      className={`menu-style${props.showing ? '' : ' hidden'}`}
    >
      <h1>Options</h1>
      <OptionsDisplay uiTheme={props.user.preferences.appliedUITheme} user={props.user} />

      <div className='theme-button-area'>
        <Button onClick={() => setThemeModalShowing(true)} color='orange' label='Browse themes' />
        <Button color='green' label='Save theme as...' />
      </div>
      <ThemeSelectModal showing={themeModalShowing} onClickOK={() => setThemeModalShowing(false)} />
    </StyledOptionsScreen>
  );
}

OptionsScreen.propTypes = {
  showing: PropTypes.bool,
  user: PropTypes.object,
  opponent: PropTypes.object,
  gameMode: PropTypes.string,
};

export default OptionsScreen;