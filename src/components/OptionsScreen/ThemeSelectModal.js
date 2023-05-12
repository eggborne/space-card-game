import { useState } from 'react';
import Button from '../Buttons/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayerPortrait from '../PlayerPortrait';

const StyledThemeSelectModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: calc(var(--main-width) - 5rem);
  height: unset;
  max-height: calc(var(--actual-height) * 0.75);
  min-height: unset;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem;
  z-index: 2;

  opacity: 0;
  pointer-events: none;
  transition: all 200ms ease;
  

  & input {
    padding: 0.5rem;
    font-style: inherit;
    font-size: inherit;
    text-align: center;
    margin-bottom: 1rem;
  }

  & h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  & > .theme-list {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0.5rem;

    & .theme-list-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      overflow: hidden;

      & > .secondary-panel {
        border: 0.25rem solid #00000066;
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
      }
    }
  }
  
  & .bottom-button-area {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: 1rem;
    width: 16rem;
    gap: 1rem;
  }
  `;
  
const ClickableThemeContainer = styled.div`
  padding: 1rem;
  border: 0.25rem solid var(--menu-border-color);
  border-radius: var(--border-radius);
  transition: all 200ms;
  cursor: pointer;
  
  &.selected {
    border-color: lightgreen;
  }
`;

function ThemeSelectModal(props) { 
  console.log("themeselect props:", props);

  const [selectedTheme, setSelectedTheme] = useState(null);

  async function handleClickTheme(theme) {
    await props.applyUserPreferences({ appliedUITheme: theme });
    setSelectedTheme(theme.id);
  }

  return (
    <StyledThemeSelectModal 
      style={{
        opacity: props.showing ? '1' : '0',
        pointerEvents: props.showing ? 'all' : 'none',
        scale: props.showing ? '1' : '1.1',
      }}
      className='menu-style'
    >
      <h2>Choose Theme</h2>
      <div className='theme-list'>
        {props.uiThemes && props.uiThemes.length && props.uiThemes.map(theme => 
        <ClickableThemeContainer 
          key={theme.id}
          className={selectedTheme === theme.id ? 'selected' : ''} 
          onClick={() => handleClickTheme(theme)} 
          style={{ 
            backgroundColor: theme['--menu-color'],
            borderRadius: theme['--border-radius'] + 'rem',
          }}
        >
          <div className='theme-list-item'>
            <h2>{theme.name}</h2>
            <div className='secondary-panel' style={{ borderColor: theme['--menu-border-color'], borderRadius: theme['--border-radius'] + 'rem', backgroundColor: theme['--secondary-color'] }} >
              <div>by {theme.creatorData.displayName}</div>
              <PlayerPortrait
                size='calc(var(--header-height))'
                imagePath={theme.creatorData.imagePath}
                sheetCoords={{ ...theme.creatorData.sheetCoords }}
              />
            </div>
            <div>{theme.public ? 'Public' : 'Private'}</div>
            <div style={{fontSize: '60%'}}>{theme.id}</div>
          </div>
        </ClickableThemeContainer>
        )}
      </div>
      <div className='bottom-button-area'>
        <Button onClick={props.onClickOK} color='green' label='OK!' />
      </div>
      <Button onClick={props.onClickCancel} label='Cancel' />
    </StyledThemeSelectModal>
  );
}

ThemeSelectModal.propTypes = {
  showing: PropTypes.bool,
  uiThemes: PropTypes.array,
  applyUserPreferences: PropTypes.func,
  handleUpdatingAppliedTheme: PropTypes.func,
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
};

export default ThemeSelectModal;
