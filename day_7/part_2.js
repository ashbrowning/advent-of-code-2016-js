'use strict';

module.exports = (inputArray) => {
  const isABA = (str) => str[0] === str[2] && str[0] !== str[1];

  const getTriplets = (str) => {
    const strArr = [];
    for (let i = 0; i <= str.length - 3; ++i) {
      strArr.push(str.substr(i, 3));
    }
    return strArr;
  };

  const ipRegex = /([^\[\]]+)/g;
  const getSections = (str) => str.match(ipRegex);
  const getABAs = (arr) => arr.map(getTriplets)
    .reduce((memo, triplets) => memo.concat(triplets.filter(isABA)), []);
  const ABAtoBAB = (str) => str[1] + str[0] + str[1];

  const hasSslSupport = (ipArr) => {
    const nonHypernet = getABAs(ipArr.filter((el, index) => (index + 1) % 2)).map(ABAtoBAB);
    const hypernet = getABAs(ipArr.filter((el, index) => index % 2));
    return nonHypernet.reduce((memo, bab) => memo || hypernet.includes(bab), false);
  };

  return inputArray.reduce((total, ip) => hasSslSupport(getSections(ip)) ? total + 1 : total, 0);
};
