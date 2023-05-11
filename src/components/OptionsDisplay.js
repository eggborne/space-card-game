import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledOptionsDisplay = styled.div`
  padding: 1rem;
  flex-grow: 1;
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
  return (
    <StyledOptionsDisplay>
      <div className='option-row'>        
        <label htmlFor='main-color'>Menu Color</label>
        <input 
          type="color" 
          name='menu-color'
          defaultValue='#ff0000'
        />
      </div>
      <div className='option-row'>        
        <label htmlFor='main-color'>Highlight Color</label>
        <input 
          type="color" 
          name='highlight-color'
          defaultValue='#ff0000'
        />
      </div>
      <div className='option-row'>        
        <label className='top-label' htmlFor='main-color'>Roundness</label>
        <input 
          type="range"
          min='0'
          max='2'
          step='0.1'
          name='border-radius'
          defaultValue='1'
        />
      </div>
    </StyledOptionsDisplay>
  );
}

OptionsDisplay.propTypes = {
  showing: PropTypes.bool,
  user: PropTypes.object,
  uiTheme: PropTypes.object,
  opponent: PropTypes.object,
  gameMode: PropTypes.string,
};

export default OptionsDisplay;