import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledPlayerPortrait = styled.div`
  // border-radius: 10%;
  // border: 0.1rem solid #000000;
  background-repeat: no-repeat;
`;

function PlayerPortrait(props) {
  let portraitSize = props.size;
  let sheetWidth = portraitSize * 8;
  let sheetHeight = portraitSize * 3;


  return (
    <StyledPlayerPortrait 
      style={{
        width: props.size,
        height: props.size,
        backgroundImage: `url(${props.imagePath})`,
        backgroundSize: '800% 300%',
        backgroundPositionX: `calc(${props.sheetCoords.x * -1} * ${props.size}`,
        backgroundPositionY: `calc(${props.sheetCoords.y * -1} * ${props.size}`,
      }} 
    />
  );
}

PlayerPortrait.propTypes = {
  size: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.object)
}

export default PlayerPortrait;