'use strict';

function isTriangle(triangle) {
  triangle.sort((a, b) => b - a);
  return triangle[0] < (triangle[1] + triangle[2]);
}

module.exports = inputArray => {
  let columns = [[], [], []];
  const regex = /\s*(\d+)\s*(\d+)\s*(\d+)/;
  let count = 0;

  for (let i = 0; i < inputArray.length; i++) {
    const regexRes = regex.exec(inputArray[i]);
    columns[0].push(parseInt(regexRes[1], 10));
    columns[1].push(parseInt(regexRes[2], 10));
    columns[2].push(parseInt(regexRes[3], 10));

    // if we have processed three rows, check for triangles
    if (i % 3 === 2) {
      count = columns.reduce((c, col) =>
         isTriangle(col) ? c + 1 : c
      , count);
      columns = [[], [], []];
    }
  }

  return count;
};

