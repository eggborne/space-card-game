import styled from 'styled-components';
import PlayerPortrait from './PlayerPortrait';
import PropTypes from 'prop-types';

const StyledHeader = styled.header`
  align-self: stretch;
  background-color: var(--header-color);
  color: #bbb;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  padding-right: 0.5rem;

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
    <StyledHeader>
      <h1>Space Card Game</h1>
      {props.userName &&
      <div className='user-info-area'>
        <div>{props.userName}</div>
        <PlayerPortrait size='calc(var(--header-height) - 1rem)' />
      </div>}
    </StyledHeader>
  );
}

Header.propTypes = {
  userName: PropTypes.string,
}

export default Header;
