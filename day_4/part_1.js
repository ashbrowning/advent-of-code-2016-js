'use strict';

function isChecksumCharsPresent({ encryptedName, checksum }) {
  for (let i = 0; i < checksum.length; ++i) {
    if (!encryptedName.includes(checksum[i])) {
      return false;
    }
  }
  return true;
}

function isValidChecksum({ encryptedName, checksum }) {
  const charFreq = encryptedName.split('').reduce((sum, char) => {
    sum[char] = sum[char] === undefined ? 1 : sum[char] + 1;
    return sum;
  }, {});

  const sortedChars = Object.keys(charFreq).sort((a, b) => {
    const diff = charFreq[b] - charFreq[a];
    if (diff === 0) {
      return a.charCodeAt(0) - b.charCodeAt(0);
    }
    return diff;
  });

  for (let i = 0; i < 5; ++i) {
    if (!checksum.includes(sortedChars[i])) {
      return false;
    }
  }
  return true;
}

module.exports = inputArray => {
  const regex = /([a-z-]+)(\d+)\[([a-z]+)\]/;
  const rooms = inputArray.map((room) => {
    const regexRes = regex.exec(room);
    return {
      encryptedName: regexRes[1].replace(/-/g, ''),
      sectorId: parseInt(regexRes[2], 10),
      checksum: regexRes[3],
    };
  });

  return rooms.filter(isChecksumCharsPresent)
    .filter(isValidChecksum)
    .reduce((sum, { sectorId }) => sum + sectorId, 0);
};
