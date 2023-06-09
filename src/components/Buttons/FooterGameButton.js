import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFooterGameButton = styled.button`
  border-radius: calc(var(--border-radius) / 1.5);
  border-style: solid;
  border-color: #00000077;
  border-width: 0.2rem;
  color: #ddd;  
  font-family: inherit;
  font-size: calc((var(--expanded-footer-height) * 0.2) - (var(--border-radius) / 32));
  font-weight: bold;
  font-family: inherit;
  min-width: 6rem;
  width: 47.5%;
  height: calc((var(--expanded-footer-height) * 0.7) - (var(--menu-border-width)));
  cursor: pointer;
  transition: opacity 200ms ease;
  padding-left: 0 !important;
  padding-right: 0 !important;

  &.highlighted {
    animation flash-border 1200ms infinite alternate;
    border: 0.5rem solid orange;
  }

  &.highlighted:last-of-type {
    animation-delay: 1200ms;
  }

  &:hover {
    border-color: #00ff00aa;
    filter: brightness(150%);
  }

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  @keyframes flash-border {
    from {
      border-width: calc(var(--expanded-footer-height) / 8);
    }
    to {
      border-width: 0;
    }
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
      className={ props.highlighted ? `${props.className} highlighted` : props.className }
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
  highlighted: PropTypes.bool,
};

export default FooterGameButton;
