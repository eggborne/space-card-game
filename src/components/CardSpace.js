import PropTypes from 'prop-types';
import styled from 'styled-components';

// main deck: YELLOW 1-10 (4 sets)
// plus cards: BLUE 1-6
// minus cards: RED 1-6

const StyledCardSpace = styled.div`
  background-color: #ffffff27;
  border-radius: var(--card-border-radius);
  border: 0.1rem solid #00000099;
`;

function CardSpace(props) {
  return (
    <StyledCardSpace
      style={{ 
        width: `calc(var(--card-width) * ${props.scale || 1})`,
        height: `calc(var(--card-height) * ${props.scale || 1})`,
      }}
    >
    </StyledCardSpace>
  );
}

CardSpace.propTypes = {
  scale: PropTypes.number,
}

export default CardSpace;