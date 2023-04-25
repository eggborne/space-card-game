import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button className="Button">
      {props.label}
    </button>
  );
}

Button.propTypes = {
  loginComponent: PropTypes.object,
  onClick: PropTypes.func
}

export default Button;
