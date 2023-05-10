import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: calc(var(--border-radius) / 2);
  border-style: solid;
  border-color: #00000077;
  border-width: 0.2rem;
  color: #ddd;  
  font-weight: bold;
  padding: 1.25rem;
  font-family: inherit;
  min-width: 6rem;
  cursor: pointer;
  transition: opacity 200ms ease;

  &:hover {
    border-color: #00ff00aa
  }

  &.main-footer {
    width: 32.5%;
  }

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

function Button(props) {
  return (
    <StyledButton
      disabled={props.disabled}
      tabIndex={props.tabIndex}
      onClick={props.onClick}
      style={{
        backgroundColor: `var(--button-${props.color || 'standard'})`,
        fontSize: props.fontSize || '1.2rem',
      }}
      className={props.className} // needs this for 'const WideButton' in TitleScreen to work ??
    >
      {props.label}
    </StyledButton>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
