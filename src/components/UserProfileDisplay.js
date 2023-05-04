import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import Button from './Buttons/Button';
import PropTypes from 'prop-types';

const StyledUserProfileDisplay = styled.div`
  position: absolute;
  left: 0;
  top: var(--header-height);
  width: var(--main-width);
  // min-height: calc(var(--header-height) * 6);
  background-color: var(--header-color);
  color: #bbb;
  padding: 1rem;
  transform-origin: top;
  transform: translateY(-100%);
  transition: all 300ms ease;
  z-index: 1;

  &.open {
    transform: none;
  }

  & .PlayerPortrait {
    opacity: 0.3;
  }

  & > .profile-grid {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-auto-rows: min-content;
    border: 0.1rem solid #00000044;
    border-radius: 0.5rem;
    background-color: #00000022;
    gap: 1rem;
    padding: 1rem;

    & > button {
      grid-row-start: 2;
      grid-column-start: 1;
      height: 3rem;
      padding: 0;
      background-color: maroon !important;
    }

    & > .footer-area {
      font-size: 75%;
      opacity: 0.8;
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      justify-content: space-between;
      height: min-content;
      align-self: flex-end;
    }

    & > .stat-list {
      grid-row-start: 1;
      grid-column-start: 2;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  & > h1 {
    font-size: 1.4rem;
  }
`;

function UserProfileDisplay(props) {
  console.log('UserProfileDisplay props is', props);
  return (
    <StyledUserProfileDisplay className={props.open && 'open'}>
      <div className='profile-grid'>
        <PlayerPortrait
          size='calc(var(--header-height) * 2)'
          imagePath={props.imagePath}
          sheetCoords={{ ...props.sheetCoords }}
        />
        <div className='stat-list'>
          <h1 className='stat-row'>{props.displayName}</h1>
          {props.currentUser &&
            <>
              <div className='stat-row'>{props.email}</div>
            </>
          }
        </div>
        {props.currentUser &&
        <>
          <Button onClick={props.onClickLogOut} label='Log out'/>
          <div className='footer-area'>
            {/* <div className='stat-row'>{props.currentUser.metadata.createdAt}</div> */}
            <div className='stat-row'>Account created: {props.currentUser.metadata.creationTime}</div>
            {/* <div className='stat-row'>{props.currentUser.metadata.lastLoginAt}</div> */}
            <div className='stat-row'>Last login: {props.currentUser.metadata.lastSignInTime}</div>
          </div>
        </>
        }
      </div>
    </StyledUserProfileDisplay>
  );
}

UserProfileDisplay.propTypes = {
  open: PropTypes.bool,
  currentUser: PropTypes.object,
  displayName: PropTypes.string,
  email: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.number),
  onClickLogOut: PropTypes.func,
};

export default UserProfileDisplay;
