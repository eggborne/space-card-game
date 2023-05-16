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
  console.warn('OptionsDisplay props', props);
  const ui = props.ui;

  useEffect(() => {
    document.getElementById(`menu-color-${props.location}`).value = props.ui['--menu-color'];
    document.getElementById(`menu-border-color-${props.location}`).value = props.ui['--menu-border-color'];
    document.getElementById(`secondary-color-${props.location}`).value = props.ui['--secondary-color'];
    document.getElementById(`border-radius-${props.location}`).value = props.ui['--border-radius'];
    document.getElementById(`menu-border-width-${props.location}`).value = props.ui['--menu-border-width'];
  }, [props.ui]);

  useEffect(() => {
    console.warn('OptionsDisplay setting handlers')
    if (props.user) {
      document.getElementById(`menu-color-${props.location}`).addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--menu-color', e.target.value);
      });
      document.getElementById(`menu-color-${props.location}`).addEventListener('change', (e) => {
        props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-color': e.target.value});
      });
      document.getElementById(`menu-border-color-${props.location}`).addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--menu-border-color', e.target.value + '66')
      });
      document.getElementById(`menu-border-color-${props.location}`).addEventListener('change', (e) => {
        props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-border-color': e.target.value})
      });
      document.getElementById(`secondary-color-${props.location}`).addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--secondary-color', e.target.value)
      });
      document.getElementById(`secondary-color-${props.location}`).addEventListener('change', (e) => {
        props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--secondary-color': e.target.value})
      });
      document.getElementById(`menu-border-width-${props.location}`).addEventListener('input', async (e) => {
        document.documentElement.style.setProperty('--menu-border-width', e.target.value + 'rem')
      });
      document.getElementById(`menu-border-width-${props.location}`).addEventListener('pointerup', async (e) => {
        await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-border-width': e.target.value})
      });
      document.getElementById(`border-radius-${props.location}`).addEventListener('input', async (e) => {
        document.documentElement.style.setProperty('--border-radius', e.target.value + 'rem')
      });
      document.getElementById(`border-radius-${props.location}`).addEventListener('pointerup', async (e) => {
        await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--border-radius': e.target.value})
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
          id={`menu-color-${props.location}`}
          defaultValue={ui['--menu-color']}
        />
      </div>
      <div className='option-row'>        
        <label htmlFor='secondary-color'>Secondary Color</label>
        <input 
          type="color" 
          name='secondary-color'
          id={`secondary-color-${props.location}`}
          defaultValue={ui['--secondary-color']}
        />
      </div>
      <div className='option-row'>        
        <label htmlFor='menu-border-color'>Border Color</label>
        <input 
          type="color" 
          name='menu-border-color'
          id={`menu-border-color-${props.location}`}
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
          id={`menu-border-width-${props.location}`}
          defaultValue={ui['--menu-border-width']}
        />
      </div>
      <div className='option-row'>        
        <label className='top-label' htmlFor='border-radius'>Roundness</label>
        <input 
          type="range"
          min='0'
          max='5'
          step='0.25'
          name='border-radius'
          id={`border-radius-${props.location}`}
          defaultValue={ui['--border-radius']}
        />
      </div>
    </StyledOptionsDisplay>
  );
}

OptionsDisplay.propTypes = {
  user: PropTypes.object,
  ui: PropTypes.object,
  location: PropTypes.string,
  handleUpdatingAppliedTheme: PropTypes.func,
};

export default OptionsDisplay;