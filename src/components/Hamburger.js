import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHamburger = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: var(--hamburger-height);
  height: var(--hamburger-height);
  max-height: 100%;
  background-color: var(--hamburger-bg-color);
  border: solid #00000044;
  cursor: pointer;
  border-radius: calc(var(--border-radius) / 3);
  border-width: var(--button-border-width);
  transition: all 300ms ease;

  & > .hamburger-bar {
    box-sizing: border-box;
    width: calc(var(--hamburger-height) * 0.8);
    height: var(--hamburger-bar-height);
    background-color: var(--hamburger-bar-color);
    transition: transform 150ms ease;
    border-radius: calc(var(--border-radius) / 8);
  }

  & > #middle-hamburger-bar-2 {
    position: absolute;
  }
`;

function Hamburger(props) {
  const [open, setOpen] = useState(false);

  function toggleHamburgerAppearance() {
    let topBar = document.getElementById('top-hamburger-bar');
    let bottomBar = document.getElementById('bottom-hamburger-bar');
    let middleBar = document.getElementById('middle-hamburger-bar');
    let middleBar2 = document.getElementById('middle-hamburger-bar-2');
    if (open) {
      // un-rotate middle bars to flat
      middleBar.style.transform = middleBar2.style.transform = 'rotate(0) scaleX(1)';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 1;
        // un-collapse top and bottom bars from middle
        topBar.style.transform = bottomBar.style.transform = 'translateY(0)';
      }, 150);
      
    } else {
      // collapse top and bottom bars to middle
      topBar.style.transform = 'translateY(200%)';
      bottomBar.style.transform = 'translateY(-200%)';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 0;
        // rotate middle bars to an X shape
        middleBar.style.transform = 'rotate(40deg) scaleX(1.1)';
        middleBar2.style.transform = 'rotate(-40deg) scaleX(1.1)';
      }, 150);
    }
    props.onClickToggle();
    setOpen(!open);
  };
  return (
    <StyledHamburger 
      style={{backgroundColor: open ? 'var(--hamburger-open-bg-color' : 'var(--hamburger-bg-color'}} 
      onClick={toggleHamburgerAppearance}
    >
      <div className='hamburger-bar' id='top-hamburger-bar'></div>
      <div className='hamburger-bar' id='middle-hamburger-bar'></div>
      <div className='hamburger-bar' id='middle-hamburger-bar-2'></div>
      <div className='hamburger-bar' id='bottom-hamburger-bar'></div>
    </StyledHamburger>
  );
}

Hamburger.propTypes = {
  onClickToggle: PropTypes.func,
}

export default Hamburger;