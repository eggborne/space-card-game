import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  --card-aspect-height: 16;
  --card-aspect-width: 11;
  background-color: #990909;
  height: var(--card-height);
  width: calc(var(--card-height) * (var(--card-aspect-width) / var(--card-aspect-height)));
  min-width: var(--card-width);
  border-radius: 0.25rem;
  border: 0.1rem solid #00000099;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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