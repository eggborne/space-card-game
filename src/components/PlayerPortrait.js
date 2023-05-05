import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPlayerPortrait = styled.div`
  box-sizing: content-box;
  border-radius: 10%;
  border: 0.1rem solid darksalmon;
  background-repeat: no-repeat;
`;

function PlayerPortrait(props) {
  return (
    <StyledPlayerPortrait 
      style={{
        width: props.size,
        minWidth: props.size,
        height: props.size,
        backgroundImage: `url(${props.imagePath})`,
        backgroundSize: props.imagePath.includes('opponent') ? '800% 400%' : '800% 300%',
        backgroundPositionX: `calc(${props.sheetCoords.x * -1} * ${props.size}`,
        backgroundPositionY: `calc(${props.sheetCoords.y * -1} * ${props.size}`,
      }} 
    />
  );
}

PlayerPortrait.propTypes = {
  size: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.number)
}

export default PlayerPortrait;