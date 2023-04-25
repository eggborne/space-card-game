import './TitleScreen.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

function TitleScreen(props) {
  return (
    <div className="TitleScreen">
      {props.loginComponent}
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
