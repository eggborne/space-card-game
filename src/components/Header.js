import styled from 'styled-components';

const StyledHeader = styled.header`
  align-self: stretch;
  background-color: #555;
  color: #bbb;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header() {
  return (
    <StyledHeader className="Header">
      <h1>Space Card Game</h1>
    </StyledHeader>
  );
}

export default Header;