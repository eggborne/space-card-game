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
    document.getElementById('menu-border-color').value = props.ui['--menu-border-color'];
    document.getElementById('secondary-color').value = props.ui['--secondary-color'];
    document.getElementById('border-radius').value = props.ui['--border-radius'];
    document.getElementById('menu-border-width').value = props.ui['--menu-border-width'];
  }, [ui]);

  useEffect(() => {
    if (props.user) {
      document.getElementById('menu-color').addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--menu-color', e.target.value);
      });
      document.getElementById('menu-color').addEventListener('change', (e) => {
        props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-color': e.target.value});
      });
      document.getElementById('menu-border-color').addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--menu-border-color', e.target.value + '66')
      });
      document.getElementById('menu-border-color').addEventListener('change', (e) => {
        props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-border-color': e.target.value})
      });
      document.getElementById('secondary-color').addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--secondary-color', e.target.value)
      });
      document.getElementById('secondary-color').addEventListener('change', (e) => {
        props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--secondary-color': e.target.value})
      });
      document.getElementById('border-radius').addEventListener('input', async (e) => {
        document.documentElement.style.setProperty('--border-radius', e.target.value + 'rem')
        await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--border-radius': e.target.value})
      });
      document.getElementById('menu-border-width').addEventListener('input', async (e) => {
        document.documentElement.style.setProperty('--menu-border-width', e.target.value + 'rem')
        await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-border-width': e.target.value})
      });
    }
  }, [props.user]);


  return (
    <StyledOptionsDisplay>
      <div className='option-row'>        
        <label htmlFor='menu-color'>Menu Color</label>
        <input 
          type="color" 
          name='menu-color'
          id='menu-color'
          defaultValue={ui['--menu-color']}
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
        <label htmlFor='menu-border-color'>Border Color</label>
        <input 
          type="color" 
          name='menu-border-color'
          id='menu-border-color'
          defaultValue={ui['--menu-border-color']}
        />
      </div>
      <div className='option-row'>        
        <label className='top-label' htmlFor='menu-border-width'>Border Width</label>
        <input 
          type="range"
          min='0'
          max='0.8'
          step='0.1'
          name='menu-border-width'
          id='menu-border-width'
          defaultValue={ui['--menu-border-width']}
        />
      </div>
      <div className='option-row'>        
        <label className='top-label' htmlFor='border-radius'>Roundness</label>
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
  handleUpdatingAppliedTheme: PropTypes.func,
};

export default OptionsDisplay;