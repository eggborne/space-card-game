import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styled from 'styled-components';

const StyledOptionsDisplay = styled.div`
  color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  & > .option-row {
    position: relative;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    & > label {
      width: max-content;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      pointer-events: none;
      
      &.top-label {
        translate: unset;
        position: unset;
        top: unset;
        left: unset;
        align-self: center;
        padding: 0.5rem;
      }
    }

    
    & > input  {
      width: unset;
      margin: 0;

      &[type=range] {
        min-height: 2rem;
      }
      &[type=color] {
        min-height: 5rem;
      }
    }
  }
`;

function OptionsDisplay(props) {
  console.log('OptionsDisplay props: ', props);

  const ui = props.ui;

  useEffect(() => {
    document.getElementById('menu-color').value = props.ui['--menu-color'];
    document.getElementById('highlight-color').value = props.ui['--inner-shade-color'];
    document.getElementById('secondary-color').value = props.ui['--secondary-color'];
    document.getElementById('border-radius').value = props.ui['--border-radius'];
  }, [props.ui]);

  useEffect(() => {
    document.getElementById('menu-color').addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--menu-color', e.target.value)
    });
    document.getElementById('highlight-color').addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--inner-shade-color', e.target.value + '66')
    });
    document.getElementById('secondary-color').addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--secondary-color', e.target.value)
    });
    document.getElementById('border-radius').addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--border-radius', e.target.value + 'rem')
    });
  });


  return (
    <StyledOptionsDisplay>
      <div className='option-row'>        
        <label htmlFor='main-color'>Menu Color</label>
        <input 
          type="color" 
          name='menu-color'
          id='menu-color'
          defaultValue={ui['--menu-color']}
        />
      </div>
      <div className='option-row'>        
        <label htmlFor='main-color'>Highlight Color</label>
        <input 
          type="color" 
          name='highlight-color'
          id='highlight-color'
          defaultValue={ui['--inner-shade-color']}
        />
      </div>
      <div className='option-row'>        
        <label htmlFor='secondary-color'>Secondary Color</label>
        <input 
          type="color" 
          name='secondary-color'
          id='secondary-color'
          defaultValue={ui['--secondary-color']}
        />
      </div>
      <div className='option-row'>        
        <label className='top-label' htmlFor='main-color'>Roundness</label>
        <input 
          type="range"
          min='0'
          max='2.5'
          step='0.1'
          name='border-radius'
          id='border-radius'
          defaultValue={ui['--border-radius']}
        />
      </div>
    </StyledOptionsDisplay>
  );
}

OptionsDisplay.propTypes = {
  user: PropTypes.object,
  ui: PropTypes.object,
};

export default OptionsDisplay;