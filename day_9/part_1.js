'use strict';

module.exports = ([input]) => {
  const markerRegex = /\((\d+)x(\d+)\)/;

  function getLength(inputStr) {
    let size = 0;
    const inputLength = inputStr.length;
    for (let i = 0; i < inputLength;) {
      if (inputStr[i] === '(') {
        let [m, l, r] = inputStr.slice(i).match(markerRegex);
        l = parseInt(l, 10);
        r = parseInt(r, 10);
        size += l * r;
        i += m.length + l;
      } else {
        size += 1;
        i += 1;
      }
    }
    return size;
  }
  return getLength(input);
};