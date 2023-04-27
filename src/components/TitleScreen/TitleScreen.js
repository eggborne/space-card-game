import './TitleScreen.css';
import Button from '../Button/Button';
import LoginArea from '../LoginArea/LoginArea';
import PropTypes from 'prop-types';

function TitleScreen(props) {
  return (
    <div style={{ display: props.showing ? 'grid' : 'none'}}className="TitleScreen">
      <LoginArea handleClickLogIn={props.handleClickLogIn} />
      <Button style={{backgroundColor: 'red'}} label='Options' />
      <Button style={{backgroundColor: 'red'}} label='How to Play' />
      <Button style={{backgroundColor: 'red'}} label='High Scores' />
    </div>
  );
}

TitleScreen.propTypes = {
  showing: PropTypes.bool,
  handleClickLogIn: PropTypes.func,
}

export default TitleScreen;
