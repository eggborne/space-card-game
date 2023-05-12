import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFooterGameButton = styled.button`
  border-radius: calc(var(--border-radius) / 1.5);
  border-style: solid;
  border-color: #00000077;
  border-width: 0.2rem;
  color: #ddd;  
  font-family: inherit;
  font-size: calc(var(--expanded-footer-height) * 0.25) !important;
  font-weight: bold;
  font-family: inherit;
  min-width: 6rem;
  width: 47.5%;
  height: calc(var(--expanded-footer-height) * 0.6);
  cursor: pointer;
  transition: opacity 200ms ease;

  &:hover {
    border-color: #00ff00aa;
    filter: brightness(150%);
  }

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

function FooterGameButton(props) {
  return (
    <StyledFooterGameButton
      disabled={props.disabled}
      tabIndex={props.tabIndex}
      onClick={props.onClick}
      style={{
        backgroundColor: `var(--button-${props.color || 'standard'})`
      }}
      className={props.className} // needs this for 'const WideFooterGameButton' in TitleScreen to work ??
    >
      {props.label}
    </StyledFooterGameButton>
  );
}

FooterGameButton.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FooterGameButton;
