'use strict';

const crypto = require('crypto');

module.exports = (inputArray) => {
  const doorId = inputArray[0];
  const answer = [];
  let count = 0;
  for (let i = 0; count < 8; ++i) {
    const hash = crypto.createHash('md5').update(doorId + i).digest('hex');
    if (hash.substr(0, 5) === '00000') {
      count++;
      answer.push(hash[5]);
    }
  }

  return answer.join('');
};
