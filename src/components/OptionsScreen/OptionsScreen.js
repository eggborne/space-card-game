import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOptionsScreen = styled.div`
  padding: 1rem;
  height: var(--actual-height);
  align-self: stretch;
  background-color: rgb(13, 71, 16);
  color: #eee;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

function OptionsScreen(props) {
  console.log('OptionsScreen props: ', props);
  return (
    <StyledOptionsScreen
      style={{ display: props.showing ? 'flex' : 'none' }}
    >
      <div>this is the options screen</div>  
    </StyledOptionsScreen>
  );
}

OptionsScreen.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  showing: PropTypes.bool,
  gameMode: PropTypes.string,
};

export default OptionsScreen;