'use strict';

module.exports = (inputArray) => {
  const leadChar = ['', '', '', '', '', '', '', ''];
  const leadCharTally = [0, 0, 0, 0, 0, 0, 0, 0];

  inputArray.reduce((tally, msg) =>
    tally.map((tallyObj, i) => {
      const char = msg[i];
      tallyObj[char] = tallyObj[char] === undefined ? 1 : tallyObj[char] + 1;

      if (leadCharTally[i] < tallyObj[char]) {
        leadCharTally[i] = tallyObj[char];
        leadChar[i] = char;
      }
      return tallyObj;
    }),
    [{}, {}, {}, {}, {}, {}, {}, {}]);

  return leadChar.join('');
};
