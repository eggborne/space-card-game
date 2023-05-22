const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pause = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const getAdjustedFontSize = (baseFontSize, str, charWidthLimit = 10) => {
  let wordsInName = str.split(' ').length;
  let totalLength = str.length;
  let modifier = 1;
  if (
    (wordsInName <= 2 && totalLength > charWidthLimit) // one word wider than portrait OR two words long enough to split to 2 lines
    || 
    (wordsInName > 2 && totalLength > 12) // more than two words (split to 2 or 3 lines?)
  ) {
    modifier = 0.9;
    if (totalLength > 18) {
      if (wordsInName === 1) {
        modifier = 0.7;
      } else {
        modifier = 0.8;
      }
    }
  }
  return `calc(${baseFontSize} * ${modifier})`;
}

export {
  randomInt,
  pause,
  getAdjustedFontSize,
}