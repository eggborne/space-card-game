import Button from '../Buttons/Button';
import LoginArea from './LoginArea';
import AvatarChoiceModal from './AvatarChoiceModal';
import ScreenVeil from '../ScreenVeil';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitleScreen = styled.div`
  padding: 1rem;
  align-self: stretch;
  color: #eee;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 0.1fr 0.1fr;
  gap: 1rem;
  padding-top: calc(var(--header-height) + 1rem);
`;

const WideButton = styled(Button)`
  grid-column-start: 1;
  grid-column-end: 3;
`;

function TitleScreen(props) {
  console.log('TitleScreen props: ', props);
  return (
    <>
      <ScreenVeil showing={props.avatarChoiceModalShowing} onClickClose={props.handleCloseAvatarModal} />
      <StyledTitleScreen style={{ display: props.showing ? 'grid' : 'none'}} >
        {/* <Button label='Log out' onClick={props.onClickLogOut} /> */}
        {!(props.user && props.user.email) ?
          <LoginArea 
            handleClickLogIn={props.handleClickLogIn} 
            handleClickRegister={props.handleClickRegister}
            setAvatarChoiceModalShowing={props.setAvatarChoiceModalShowing}
          />
          :
          <div>
            <Button label='Log out' onClick={props.onClickLogOut} />
          </div>
        }
        <Button style={{backgroundColor: 'red'}} label='Options' />
        <Button style={{backgroundColor: 'red'}} label='How to Play' />
        <WideButton style={{backgroundColor: 'red'}} label='High Scores' />
      </StyledTitleScreen>
      <AvatarChoiceModal 
        showing={props.avatarChoiceModalShowing} 
        onClickOK={props.handleChooseAvatar} 
      />
    </>
  );
}

TitleScreen.propTypes = {
  user: PropTypes.object,
  showing: PropTypes.bool,
  handleClickLogIn: PropTypes.func,
  onClickLogOut: PropTypes.func,
  handleClickRegister: PropTypes.func,
  handleChooseAvatar: PropTypes.func,
  handleCloseAvatarModal: PropTypes.func,
  setAvatarChoiceModalShowing: PropTypes.func,
  avatarChoiceModalShowing: PropTypes.bool,
}

export default TitleScreen;
