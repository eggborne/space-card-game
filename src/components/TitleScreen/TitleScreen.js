import './TitleScreen.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import LoginArea from '../LoginArea/LoginArea';

function TitleScreen(props) {
  return (
    <div className="TitleScreen">
      <LoginArea />
      <Button label='Options' />
      <Button label='How to Play' />
      <Button label='High Scores' />
    </div>
  );
}

TitleScreen.propTypes = {
  loginComponent: PropTypes.object,
}

export default TitleScreen;
