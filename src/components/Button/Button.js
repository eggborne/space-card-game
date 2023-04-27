import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
  return (
    <button style={{ backgroundColor: `var(--button-${props.color || 'standard'})` }} tabIndex={props.tabIndex} onClick={props.onClick} className="Button">
      {props.label}
    </button>
  );
}

Button.propTypes = {
  tabIndex: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;
