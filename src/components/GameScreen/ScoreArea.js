import Card from '../Card';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardBack from '../CardBack';

const StyledScoreArea = styled.div`
  width: var(--card-width);
  height: var(--card-height);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  padding: calc(var(--main-padding) * 2);

  & > .set-win-display {
    width: 100%;
    height: calc(var(--card-width) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5%;

    & > div {
      border-radius: 50%;
      border: 1px solid gold;
      width:  calc(var(--card-width) / 4);
      height:  calc(var(--card-width) / 4);
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
        0
      </ScoreDisplay>
      <div className='set-win-display'>
        <div style={{ backgroundColor: 'transparent' }}></div>
        <div style={{ backgroundColor: 'transparent' }}></div>
        <div style={{ backgroundColor: 'transparent' }}></div>
      </div>
    </StyledScoreArea>
  );
}

ScoreArea.propTypes = {
  playerObject: PropTypes.object,
};

export default ScoreArea;