'use strict';

module.exports = inputArray => {
  const regex = /\s*(\d+)\s*(\d+)\s*(\d+)/;
  return inputArray.reduce((count, triangleStr) => {
    const regexRes = regex.exec(triangleStr);
    const triangle = [
      parseInt(regexRes[1], 10),
      parseInt(regexRes[2], 10),
      parseInt(regexRes[3], 10),
    ];
    triangle.sort((a, b) => b - a);
    return triangle[0] < (triangle[1] + triangle[2]) ? count + 1 : count;
  }, 0);
};
