import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import Button from './Buttons/Button';
import PropTypes from 'prop-types';

const StyledUserProfileDisplay = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-auto-rows: min-content;
  border: 0.1rem solid #00000044;
  border-radius: 0.5rem;
  background-color: #00000022;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1rem;

  & > button {
    grid-row-start: 2;
    grid-column-start: 1;
    height: 3rem;
    padding: 0;
    background-color: maroon !important;
  }

  & > .footer-area {
    font-size: 70%;
    opacity: 0.8;
    grid-column-start: 1;
    grid-column-end: 3;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    height: min-content;
    align-self: flex-end;
  }

  & > .stat-list {
    grid-row-start: 1;
    grid-column-start: 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`;

function UserProfileDisplay(props) {
  console.log('UserProfileDisplay props is', props);
  return (
    <StyledUserProfileDisplay>
        <PlayerPortrait
          size='calc(var(--header-height) * 2)'
          imagePath={props.user.imagePath}
          sheetCoords={{ ...props.user.sheetCoords }}
        />
        <div className='stat-list'>
          <h1 className='stat-row'>{props.user.displayName}</h1>
          {props.userLoggedIn &&
            <>
              <div className='stat-row'>{props.user.email}</div>
              <div className='stat-row'>{props.user.progress.credits} credits</div>
              <div className='stat-row'>{props.user.statistics.setWins} / {props.user.statistics.totalSets} sets won</div>
              <div className='stat-row'>{props.user.statistics.matchWins} / {props.user.statistics.totalMatches} matches won</div>
              <div className='stat-row'>{props.user.progress.cpuDefeated.length || 'No'} opponents defeated</div>
              <div className='stat-row'>{props.user.progress.wonCards.length || 'No'} special cards</div>
            </>
          }
        </div>
        {props.userLoggedIn &&
        <>
          <Button onClick={props.onClickLogOut} label='Log out'/>
          <div className='footer-area'>
            {/* <div className='stat-row'>{props.currentUser.metadata.createdAt}</div> */}
            <div className='stat-row'>Account created: {props.currentUser.metadata.creationTime}</div>
            {/* <div className='stat-row'>Last login: {getTimeSinceFromSeconds((Date.now()) - props.currentUser.metadata.lastLoginAt)}</div> */}
            <div className='stat-row'>Last login: {props.currentUser.metadata.lastSignInTime}</div>
          </div>
        </>
        }
    </StyledUserProfileDisplay>
  );
}

UserProfileDisplay.propTypes = {
  userLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  onClickLogOut: PropTypes.func,
};

export default UserProfileDisplay;
