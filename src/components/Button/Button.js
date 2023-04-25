import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button onClick={props.onClick} className="Button">
      {props.label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;
