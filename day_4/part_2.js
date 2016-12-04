'use strict';

function isChecksumCharsPresent({ encryptedNameSansDash, checksum }) {
  for (let i = 0; i < checksum.length; ++i) {
    if (!encryptedNameSansDash.includes(checksum[i])) {
      return false;
    }
  }
  return true;
}

function isValidChecksum({ encryptedNameSansDash, checksum }) {
  const charFreq = encryptedNameSansDash.split('').reduce((sum, char) => {
    sum[char] = sum[char] === undefined ? 1 : sum[char] + 1;
    return sum;
  }, {});

  const sortedChars = Object.keys(charFreq).sort((a, b) => {
    const diff = charFreq[b] - charFreq[a];
    return diff === 0 ? a.charCodeAt(0) - b.charCodeAt(0) : diff;
  });

  for (let i = 0; i < 5; ++i) {
    if (!checksum.includes(sortedChars[i])) {
      return false;
    }
  }
  return true;
}

function encrypt(str, shift) {
  return str.split('').reduce((encryptedStr, char) => {
    const charCode = ((char.charCodeAt(0) + shift - 97) % 26) + 97;
    return encryptedStr + String.fromCharCode(charCode);
  }, '');
}

module.exports = inputArray => {
  const regex = /([a-z-]+)(\d+)\[([a-z]+)\]/;
  const rooms = inputArray.map((room) => {
    const regexRes = regex.exec(room);
    return {
      encryptedName: regexRes[1],
      encryptedNameSansDash: regexRes[1].replace(/-/g, ''),
      sectorId: parseInt(regexRes[2], 10),
      checksum: regexRes[3],
    };
  });

  const validRooms = rooms.filter(isChecksumCharsPresent)
    .filter(isValidChecksum);

  // Encrypt the phrase we're looking for instead of decrypting each room name
  const encryptedNorthPoles = [];
  for (let i = 0; i < 26; ++i) {
    encryptedNorthPoles.push(encrypt('northpole', i));
  }

  for (let i = 1; i < validRooms.length; ++i) {
    const room = validRooms[i];
    const lookup = 26 - (room.sectorId % 26);
    if (room.encryptedName.includes(encryptedNorthPoles[lookup])) {
      return room.sectorId;
    }
  }
  return 0;
};
