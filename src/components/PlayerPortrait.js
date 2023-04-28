import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPlayerPortrait = styled.div`
  border: 0.1rem solid #00000033;
  background-size: contain;
`;

function PlayerPortrait(props) {
  return (
    <StyledPlayerPortrait 
      style={{
        width: props.size,
        height: props.size,
        backgroundImage: `url(${props.imagePath})`,
      }} 
    />
  );
}

PlayerPortrait.propTypes = {
  size: PropTypes.string,
  imagePath: PropTypes.string,
}

export default PlayerPortrait;