import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPlayerPortrait = styled.div`
  border: 2px solid #00000033;
  background-image: url(usericon.png);
  background-size: contain;
`;

function PlayerPortrait(props) {
  return (
    <StyledPlayerPortrait style={{
      width: props.size,
      height: props.size,
    }}>
      
    </StyledPlayerPortrait>
  );
}

PlayerPortrait.propTypes = {
  size: PropTypes.string,
}

export default PlayerPortrait;