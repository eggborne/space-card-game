const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pause = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const getAdjustedFontSize = (baseFontSize, str) => {
  let wordsInName = str.split(' ').length;
  let totalLength = str.length;
  let modifier = 1;
  if ((wordsInName <= 2 && totalLength > 10) || (wordsInName > 2 && totalLength > 12)) {
    modifier = 0.9;
    if (totalLength > 18) {
      modifier = 0.7;
    }
  }
  if (wordsInName === 1 && totalLength > 7) {
    modifier = 0.8;
  }
  console.log('returning', `calc(${baseFontSize} * ${modifier})`);
  return `calc(${baseFontSize} * ${modifier})`;
}

export {
  randomInt,
  pause,
  getAdjustedFontSize,
}