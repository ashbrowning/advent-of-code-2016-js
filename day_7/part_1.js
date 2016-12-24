'use strict';

module.exports = (inputArray) => {
  const isABBA = (str) => (str[0] === str[3] && str[1] === str[2] && !(str[0] === str[1]));
  const isABBAString = (str) => {
    for (let i = 0; i <= (str.length - 4); ++i) {
      if (isABBA(str.substr(i, 4))) { return true; }
    }
    return false;
  };

  const ipRegex = /([^\[\]]+)/g;
  const getSections = (str) => str.match(ipRegex);
  const hasABBAInArray = (arr) => arr.reduce((memo, str) => isABBAString(str) || memo, false);
  const hasTLSSupport = (arr) => hasABBAInArray(arr.filter((el, index) => (index + 1) % 2)) &&
      !hasABBAInArray(arr.filter((el, index) => index % 2));
  return inputArray.reduce((total, ip) => hasTLSSupport(getSections(ip)) ? total + 1 : total, 0);
};
