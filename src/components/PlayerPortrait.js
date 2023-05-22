import styled from 'styled-components';
import PropTypes from 'prop-types';

const PortraitContainer = styled.div`
  position: relative; 
`;

const StyledPlayerPortrait = styled.div`
  box-sizing: content-box;
  border-radius: var(--portrait-border-radius);
  border: 1px solid rgb(139, 71, 48);
  background-repeat: no-repeat;
`;

const PortraitNameLabel = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  text-align: center;
  left: 50%;
  transform: translate(-50%);
  text-shadow: 0 0 0.5rem #000000;
  z-index: 3;
  line-height: 110%;
`;

function PlayerPortrait(props) {
  let labelFontSize = '0.9rem';
  if (props.displayName) {
    let portraitSize = isNaN(parseInt(props.size)) ? props.size : parseInt(props.size);
    let wordsInName = props.displayName.split(' ').length;
    let totalLength = props.displayName.length;
    let modifier = 1;
    console.log('portraitSize', portraitSize, props.displayName, 'wordsInName', wordsInName, 'totalLength', totalLength);
    if ((wordsInName <= 2 && totalLength > 10) || (wordsInName > 2 && totalLength > 12)) {
      modifier = 0.9;
      if (totalLength > 18) {
        modifier = 0.7;
      }
    }
    if (wordsInName === 1 && totalLength > 7) {
      modifier = 0.8;
    }
    console.warn(props.displayName, 'size', labelFontSize);
    labelFontSize = `calc(${labelFontSize} * ${modifier}`;
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
          borderWidth: `calc(${props.size} / 24)`,
          borderRadius: props.borderRadius || 'var(--portrait-border-radius)',
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
  sheetCoords: PropTypes.objectOf(PropTypes.number),
  borderRadius: PropTypes.string,
}

export default PlayerPortrait;