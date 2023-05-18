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
  return (
    <>
      <ScreenVeil showing={props.avatarChoiceModalShowing} onClickClose={props.handleCloseAvatarModal} />
      <StyledTitleScreen style={{ display: props.showing ? 'grid' : 'none'}} >
        <LoginArea 
          user={props.user}
          authUser={props.authUser}
          userLoggedIn={props.userLoggedIn}
          handleClickLogIn={props.handleClickLogIn} 
          onClickPlay={props.handleClickPlay} 
          onClickLogOut={props.onClickLogOut} 
          handleClickRegister={props.handleClickRegister}
          setAvatarChoiceModalShowing={props.setAvatarChoiceModalShowing}
        />
        <Button onClick={props.handleClickOptions} label='Options' />
        <Button disabled={true} label='How to Play' />
        <WideButton  onClick={props.handleClickHallOfFame} label='Hall of Fame' />
      </StyledTitleScreen>
      <AvatarChoiceModal 
        playingAsGuest={!props.userLoggedIn}
        showing={props.avatarChoiceModalShowing} 
        onClickOK={props.handleChooseAvatar} 
      />
    </>
  );
}

TitleScreen.propTypes = {
  userLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  authUser: PropTypes.object,
  showing: PropTypes.bool,
  handleClickLogIn: PropTypes.func,
  handleClickPlay: PropTypes.func,
  handleClickOptions: PropTypes.func,
  handleClickHallOfFame: PropTypes.func,
  onClickLogOut: PropTypes.func,
  handleClickRegister: PropTypes.func,
  handleChooseAvatar: PropTypes.func,
  handleCloseAvatarModal: PropTypes.func,
  setAvatarChoiceModalShowing: PropTypes.func,
  avatarChoiceModalShowing: PropTypes.bool,
}

export default TitleScreen;
