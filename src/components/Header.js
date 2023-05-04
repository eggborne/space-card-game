import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import PropTypes from 'prop-types';

const StyledHeader = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: var(--main-width);
  align-self: stretch;
  background-color: var(--header-color);
  color: #bbb;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  padding-right: 0.5rem;
  transform-origin: top;
  transition: all 200ms ease;

  & > h1 {
    font-size: 1.4rem;
  }

  & > .user-info-area {
    display: flex;
    gap: 0.5rem;

    & > div:first-child {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-evenly;
    }
  }
`;

function Header(props) {
  console.log('Header props is', props)
  return (
    <StyledHeader style={{
      // height: props.phase === 'game-board-showing' ? '0' : 'var(--header-height)',
      transform: props.phase === 'game-board-showing' ? 'translateY(-100%)' : 'translateY(0)',
    }}>
      <h1>Space Card Game</h1>
      {props.currentUser ?
        <div className='user-info-area'>
          <div>
            <div style={{ fontSize: '100%', fontWeight: 'bold'}}>{props.currentUser.displayName}</div>
            <div style={{ fontSize: '80%'}}>{props.currentUser.email}</div>
          </div>
          <PlayerPortrait 
            size='calc(var(--header-height) - 1rem)' 
            imagePath={props.imagePath}
            sheetCoords={{...props.sheetCoords}}
          />
        </div>
        :
        props.email === 'guest@guest.guest' ?
        <div className='user-info-area'>
          <div>
            <div style={{ fontSize: '100%', fontWeight: 'bold'}}>{props.displayName}</div>
          </div>
          <PlayerPortrait 
            size='calc(var(--header-height) - 1rem)' 
            imagePath={props.imagePath}
            sheetCoords={{...props.sheetCoords}}
          />
        </div>
        :
        <div style={{marginRight: '1rem', fontSize: '90%'}}>not logged in</div>  
      }
    </StyledHeader>
  );
}

Header.propTypes = {
  currentUser: PropTypes.object,
  displayName: PropTypes.string,
  email: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.number),
}

export default Header;
