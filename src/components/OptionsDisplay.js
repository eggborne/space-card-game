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
  margin-top: 2rem;
  margin-bottom: 2rem;

  // flex-grow: 1;

  & .option-row {
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
        // min-height: 2rem;
      }
      &[type=color] {
        min-height: 5rem;
      }
    }
  }
`;

function OptionsDisplay(props) {
  const ui = props.ui;

  useEffect(() => {
    document.getElementById(`menu-color-${props.location}`).value = props.ui['--menu-color'];
    document.getElementById(`menu-border-color-${props.location}`).value = props.ui['--menu-border-color'];
    document.getElementById(`secondary-color-${props.location}`).value = props.ui['--secondary-color'];
    document.getElementById(`menu-border-width-${props.location}`).value = props.ui['--menu-border-width'];
    document.getElementById(`border-radius-${props.location}`).value = props.ui['--border-radius'];
    document.getElementById(`portrait-border-radius-${props.location}`).value = props.ui['--portrait-border-radius'];
  }, [props.ui, props.location]);

  useEffect(() => {
    if (props.user) {
      document.getElementById(`menu-color-${props.location}`).addEventListener('input', (e) => { 
        document.documentElement.style.setProperty('--menu-color', e.target.value);
        document.querySelector('meta[name="theme-color"]').setAttribute('content', e.target.value);

      });
      document.getElementById(`menu-color-${props.location}`).addEventListener('change', (e) => { props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-color': e.target.value}); });
      document.getElementById(`menu-border-color-${props.location}`).addEventListener('input', (e) => { document.documentElement.style.setProperty('--menu-border-color', e.target.value + '66') });
      document.getElementById(`menu-border-color-${props.location}`).addEventListener('change', (e) => { props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-border-color': e.target.value}) });
      document.getElementById(`secondary-color-${props.location}`).addEventListener('input', (e) => { document.documentElement.style.setProperty('--secondary-color', e.target.value) });
      document.getElementById(`secondary-color-${props.location}`).addEventListener('change', (e) => { props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--secondary-color': e.target.value}) });
      document.getElementById(`menu-border-width-${props.location}`).addEventListener('input', async (e) => { document.documentElement.style.setProperty('--menu-border-width', e.target.value + 'rem') });
      document.getElementById(`menu-border-width-${props.location}`).addEventListener('pointerup', async (e) => { await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--menu-border-width': e.target.value}) });
      document.getElementById(`border-radius-${props.location}`).addEventListener('input', async (e) => { document.documentElement.style.setProperty('--border-radius', e.target.value + 'rem') });
      document.getElementById(`border-radius-${props.location}`).addEventListener('pointerup', async (e) => { await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--border-radius': e.target.value}) });
      document.getElementById(`portrait-border-radius-${props.location}`).addEventListener('input', async (e) => { document.documentElement.style.setProperty('--portrait-border-radius', e.target.value + '%') });
      document.getElementById(`portrait-border-radius-${props.location}`).addEventListener('pointerup', async (e) => { await props.handleUpdatingAppliedTheme({...props.user.preferences.appliedUITheme, '--portrait-border-radius': e.target.value}) });
    }
  }, [props.user]);


  return (
    <StyledOptionsDisplay>
      <div style={{overflow: 'auto', flexGrow: '1', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: props.location === 'options-screen' ? '1rem' : '0'}}>
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
      <div className='option-row' style={{ marginBottom: '0.5rem' }} >        
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
          step='0.05'
          name='menu-border-width'
          id={`menu-border-width-${props.location}`}
          defaultValue={ui['--menu-border-width']}
        />
      </div>
      <div className='option-row'>        
        <label className='top-label' htmlFor='border-radius'>General Roundness</label>
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
      <div className='option-row'>        
        <label className='top-label' htmlFor='border-radius'>Portrait Roundness</label>
        <input 
          type="range"
          min='0'
          max='50'
          step='1'
          name='portrait-border-radius'
          id={`portrait-border-radius-${props.location}`}
          defaultValue={ui['--portrait-border-radius']}
        />
      </div>
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