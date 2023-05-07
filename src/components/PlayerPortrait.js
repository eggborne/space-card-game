import styled from 'styled-components';
import PropTypes from 'prop-types';

const PortraitContainer = styled.div`
  position: relative; 
`;

const StyledPlayerPortrait = styled.div`
  box-sizing: content-box;
  border-radius: 10%;
  border: 0.1rem solid darksalmon;
  background-repeat: no-repeat;
`;

const PortraitNameLabel = styled.div`
  position: absolute;
  bottom: var(--main-padding);
  left: var(--main-padding);
  text-shadow: 0 0 0.25rem #000000;
  z-index: 3;
`;

function PlayerPortrait(props) {
  let labelFontSize = '1';
  if (props.displayName) {
    console.log('for', props.displayName);
    let portraitSize = parseInt(props.size);
    let wordsInName = props.displayName.split(' ').length;
    let totalLength = props.displayName.length;
    console.log('wordsInName: ', wordsInName)
    console.log('totalLength: ', totalLength)
    if ((wordsInName <= 2 && totalLength > 10) || (wordsInName > 2 && totalLength > 12)) {
      labelFontSize = portraitSize / 5;
      if (totalLength > 18) {
        labelFontSize = portraitSize / 9;
      }
    }
    labelFontSize = labelFontSize + 'rem';
    console.log('labelFontSize: ' + labelFontSize)
    console.log('----------------------------')
  }
  return (
    <PortraitContainer>
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
        {props.displayName &&
          <PortraitNameLabel style={{
            fontSize: labelFontSize,
          }}>
            {props.displayName}
          </PortraitNameLabel>
        }
    </PortraitContainer>
  );
}

PlayerPortrait.propTypes = {
  size: PropTypes.string,
  displayName: PropTypes.string,
  imagePath: PropTypes.string,
  sheetCoords: PropTypes.objectOf(PropTypes.number)
}

export default PlayerPortrait;