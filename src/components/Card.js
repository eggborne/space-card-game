import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  background-color: #990909;
  width: var(--card-width);
  height: var(--card-height);
  max-width: calc((var(--main-width) / 5) - (var(--main-padding) * 1.5));
  max-height: calc(var(--section-height) - (var(--main-padding) * 0.75));
  // min-width: var(--card-width);
  border-radius: 0.25rem;
  border: 0.1rem solid #00000099;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: var(--card-border-radius);

  & .knob {
    position: absolute;
    border-radius: 50%;
    width: 100%;
    height: 25%;
  }

  &.placeholder {
    opacity: 0;
  }
`;

function Card(props) {

  return (
    <StyledCard className={ props.value ? '' : 'placeholder'}>
      {props.value}
    </StyledCard>
  );
}

Card.propTypes = {
  value: PropTypes.number,
};

export default Card;