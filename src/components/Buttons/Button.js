import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: calc(var(--border-radius) / 2);
  border-style: solid;
  border-color: #00000077;
  border-width: 0.2rem;
  color: #ddd;  
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  padding: 1rem 0;
  font-family: inherit;
  font-size: inherit;
  min-width: 6rem;
  cursor: pointer;

  &:hover {
    border-color: #00ff00aa
  }

  &.main-footer {
    width: 45%;
  }
`;

function Button(props) {
  return (
    <StyledButton
      tabIndex={props.tabIndex}
      onClick={props.onClick}
      style={{
        backgroundColor: `var(--button-${props.color || 'standard'})`
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
  onClick: PropTypes.func
};

export default Button;
