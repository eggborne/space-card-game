import PlayerPortrait from '../PlayerPortrait';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledVersusScreen = styled.div`
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: var(--expanded-footer-height);
  padding-top: var(--header-height);
  transition: transform 1500ms ease-in, opacity 900ms ease;
  // transform-origin 50% 47.5%;
  transform-origin 50% calc(50% - 1rem);

  &.zoomed-off {
    transform: translateX(0) scale(8);
    opacity: 0;
  }
`;

const VersusScreenPlayerArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 1rem;
  gap: 1rem;
  width: 14rem;
  font-weight: bold;
  transition: transform 500ms ease, opacity 500ms ease;

  &:first-of-type {
    transform: translateX(-100%);
    opacity: 0;  
  }
  
  &:last-of-type {
    transform: translateX(100%);
    opacity: 0;
  }

  &.onscreen {
    transform: translateX(0);
    opacity: 1;
    animation: bouncing 200ms ease-out forwards;
    animation-delay: 500ms;
  }

  &.onscreen:first-of-type {
    --bounce-amount: -10%;
  }
  &.onscreen:last-of-type {
    --bounce-amount: 10%;
  }
`;

function VersusScreen(props) {
  return (
    <StyledVersusScreen id='versus-screen'
      style={{ display: props.showing ? 'flex' : 'none' }}
    >
      <VersusScreenPlayerArea id='player-area-1'>
        <div>{props.opponent.displayName}</div>
        <PlayerPortrait
          size='calc(var(--main-width) / 3.5)'
          imagePath={props.opponent.imagePath}
          sheetCoords={props.opponent.sheetCoords}
        />
      </VersusScreenPlayerArea>
      <h2>VS.</h2>
      <VersusScreenPlayerArea id='player-area-2'>
        <PlayerPortrait
          size='calc(var(--main-width) / 3.5)'
          imagePath={props.user.imagePath}
          sheetCoords={props.user.sheetCoords}
        />
        <div>{props.user.displayName}</div>
      </VersusScreenPlayerArea>
    </StyledVersusScreen>
  );
}

VersusScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  showing: PropTypes.bool,
};

export default VersusScreen;