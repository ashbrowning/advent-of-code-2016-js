'use strict';

module.exports = (inputArray) => {
  const overallTally = inputArray.reduce((tally, msg) =>
    tally.map((tallyObj, i) => {
      const char = msg[i];
      tallyObj[char] = tallyObj[char] === undefined ? 1 : tallyObj[char] + 1;
      return tallyObj;
    }),
    [{}, {}, {}, {}, {}, {}, {}, {}]);

  return overallTally.reduce((msg, tallyObj) => {
    let leadChar = '';
    let leadCharTally = Number.MAX_SAFE_INTEGER;
    const chars = Object.keys(tallyObj);
    for (let i = 0; i < chars.length; ++i) {
      if (leadCharTally > tallyObj[chars[i]]) {
        leadCharTally = tallyObj[chars[i]];
        leadChar = chars[i];
      }
    }
    return msg + leadChar;
  }, '');
};
