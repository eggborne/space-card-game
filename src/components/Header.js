import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import PropTypes from 'prop-types';

const StyledHeader = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: var(--main-width);
  height: var(--header-height);
  align-self: stretch;
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  padding: 0 calc(0.75rem + (var(--border-radius) / 4.5));
  transform-origin: top;
  transition: all 200ms ease;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: none !important;
  z-index: 2;

  ::before {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    top: 0;
    height: calc(var(--header-height) - (var(--main-padding) * 1.5));
  }

  & > h1 {
    font-size: 1.4rem;
    color: lightgreen;
  }

  & > .user-info-area {
    display: flex;
    gap: 0.5rem;
    text-shadow: 0 0 1px #000000ff;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-evenly;
    }
  }
`;

function Header(props) {
  console.log('header props', props)
  const showUserInfo = props.phase !== 'game-board-showing';
  return (
    <StyledHeader className='menu-style' style={{
      transform: props.phase === 'game-board-showing' ? 'translateY(-100%)' : 'translateY(0)',
    }}>
      <h1>pazaak.live</h1>
      {props.authUser && (showUserInfo || props.phase === 'title') ?
        <div className='user-info-area'>
          <div>
            <div style={{ fontSize: '100%', fontWeight: 'bold' }}>{props.authUser.displayName}</div>
            <div style={{ fontSize: '100%', color: 'lightgreen' }}>${props.user.progress.credits}<span style={{ color: 'white', fontSize: '90%' }}> {props.user.statistics.setWins}/{props.user.statistics.totalSets}</span></div>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={props.phase !== 'title' ? props.onClickProfileMenu : null}>
            <PlayerPortrait
              size='calc(var(--header-height) - 1.25rem)'
              imagePath={props.user.imagePath}
              sheetCoords={{ ...props.user.sheetCoords }}
            />
          </div>
        </div>
        :
        props.user.email === 'guest@guest.guest' && showUserInfo ?
          <div className='user-info-area'>
            <div>
              <div style={{ fontSize: '100%', fontWeight: 'bold' }}>{props.user.displayName}</div>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={props.phase !== 'title' ? props.onClickProfileMenu : null}>
              <PlayerPortrait
                size='calc(var(--header-height) - 1.5rem)'
                imagePath={props.user.imagePath}
                sheetCoords={{ ...props.user.sheetCoords }}
              />
            </div>
          </div>
          :
          <div></div>
      }
    </StyledHeader>
  );
}

Header.propTypes = {
  phase: PropTypes.string,
  user: PropTypes.object,
  profileMenuOpen: PropTypes.bool,
  avatarChoiceModalShowing: PropTypes.bool,
  authUser: PropTypes.object,
  onClickProfileMenu: PropTypes.func,
};

export default Header;
