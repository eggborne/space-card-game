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
  }
`;

function Header(props) {
  return (
    <StyledHeader style={{
      // height: props.phase === 'game-board-showing' ? '0' : 'var(--header-height)',
      transform: props.phase === 'game-board-showing' ? 'translateY(-100%)' : 'translateY(0)',
    }}>
      <h1>Space Card Game</h1>
      {props.userName && props.sheetCoords &&
      <div className='user-info-area'>
        <div>{props.userName}</div>
        <PlayerPortrait 
          size='calc(var(--header-height) - 1rem)' 
          imagePath={props.imagePath}
          sheetCoords={{...props.sheetCoords}}
        />
      </div>}
    </StyledHeader>
  );
}

Header.propTypes = {
  userName: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.number),
}

export default Header;
