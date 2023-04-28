import Button from '../Buttons/Button';
import LoginArea from './LoginArea';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitleScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  background-color: #565;
  color: #eee;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 0.1fr 0.1fr;
  gap: 1rem;
`;

const WideButton = styled(Button)`
  grid-column-start: 1;
  grid-column-end: 3;
`;

function TitleScreen(props) {
  return (
    <StyledTitleScreen style={{ display: props.showing ? 'grid' : 'none'}} >
      <LoginArea handleClickLogIn={props.handleClickLogIn} />
      <Button style={{backgroundColor: 'red'}} label='Options' />
      <Button style={{backgroundColor: 'red'}} label='How to Play' />
      <WideButton style={{backgroundColor: 'red'}} label='High Scores' />
    </StyledTitleScreen>
  );
}

TitleScreen.propTypes = {
  showing: PropTypes.bool,
  handleClickLogIn: PropTypes.func,
}

export default TitleScreen;
