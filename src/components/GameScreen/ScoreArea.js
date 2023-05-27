import Card from '../Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardBack from '../CardBack';

const StyledScoreArea = styled.div`
  width: var(--card-width);
  height: var(--card-height);
  max-width: calc((var(--main-width) / 5) - (var(--main-padding) * 1.5));
  max-height: var(--card-max-height);
  max-width: var(--card-max-width);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--main-padding) * 2);
  
  & > .set-win-display {
    max-width: 90%;
    height: calc(var(--card-width) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;

    & > div {
      border-radius: 50%;
      border: 1px solid gold;
      min-width: calc(var(--card-height) / 5.25);
      min-height: calc(var(--card-height) / 5.25);
      
      max-width: calc(var(--card-width) / 5);
      max-height: calc(var(--card-width) / 5);

      transition: background-color 200ms ease;

      @media screen and (min-width: 540px) {
        min-width: calc(var(--card-height) / 6);
        min-height: calc(var(--card-height) / 6);
        
      }
    }
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 37.5%;
  border-radius: 42.5%;
  border: 0.325rem solid orange;
  font-size: 1.25rem;
`;

function ScoreArea(props) {
  return (
    <StyledScoreArea style={{ flexDirection: props.playerObject.email ? 'column' : 'column-reverse'}}>
      <ScoreDisplay>
        {props.playerStatus.matchScore}
      </ScoreDisplay>
      <div className='set-win-display'>
        <div style={{ backgroundColor: props.playerStatus.setsWon >= 1 ? 'gold' : 'transparent' }}></div>
        <div style={{ backgroundColor: props.playerStatus.setsWon >= 2 ? 'gold' : 'transparent' }}></div>
        <div style={{ backgroundColor: props.playerStatus.setsWon === 3 ? 'gold' : 'transparent' }}></div>
      </div>
    </StyledScoreArea>
  );
}

ScoreArea.propTypes = {
  playerObject: PropTypes.object,
  playerStatus: PropTypes.object,
};

export default ScoreArea;