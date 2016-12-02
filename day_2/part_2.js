'use strict';

module.exports = inputArray => {
  const x = 3;
  const y = 3;
  const max = 13;
  const startRowVals = getRowStartValues(max);
  const midIndex = Math.floor(startRowVals.length / 2);
  console.log(startRowVals);


  // const fnMap = {
  //   'U': (val) => (val - x) <= 0 ? val : val - x,
  //   'D': (val) => (val + x) > max ? val : val + x,
  //   'L': (val) => ((val - 1) % x === 0) ? val : val - 1,
  //   'R': (val) => ((val + 1) % x === 1) ? val : val + 1,
  // };

  const fnMap = {
    'U': (val) => {
      const rowStartIdx = findStartRowIdx(val, startRowVals);
      if (rowStartIdx === 0) {
        return val;
      }

      //are we above or below the middle?
      const isAbove = !!(midIndex >= rowStartIdx);

      //if in top half, check for beginning/end element
      if (isAbove) {
        if (val === startRowVals[rowStartIdx] || val === startRowVals[rowStartIdx + 1] - 1 ) {
          return val;
        }
      }

      let difference = startRowVals[rowStartIdx] - startRowVals[rowStartIdx - 1];
      difference += isAbove ? 1 : -1;
      return val - difference;
    },
    'D': (val) => {
      const rowStartIdx = findStartRowIdx(val, startRowVals);
      if (rowStartIdx === startRowVals.length - 1) {
        return val;
      }

      //are we above or below the middle?
      const isBelow = !!(midIndex <= rowStartIdx);

      //if in top half, check for beginning/end element
      if (isBelow) {
        if (val === startRowVals[rowStartIdx] || val === startRowVals[rowStartIdx + 1] - 1 ) {
          return val;
        }
      }

      let difference = startRowVals[rowStartIdx + 1] - startRowVals[rowStartIdx];
      difference += isBelow ? -1 : 1;
      return val + difference;
    },
    'L': (val) => {
      const rowStartIdx = findStartRowIdx(val, startRowVals);
      if (val === startRowVals[rowStartIdx]) {
        return val;
      } else {
        return val - 1;
      }
    },
    'R': (val) => {
      const rowStartIdx = findStartRowIdx(val, startRowVals);
      //Get size of row
      if (rowStartIdx === startRowVals.length - 1){
        return val;
      }

      const rowSize = startRowVals[rowStartIdx + 1] - startRowVals[rowStartIdx];

      if (val === startRowVals[rowStartIdx] + rowSize - 1) {
        return val;
      } else {
        return val + 1;
      }
    },
  };


  const lockCode = inputArray.reduce((lockCode, instruction) => {
    let code = lockCode.length === 0 ? 5 : lockCode[lockCode.length - 1];
    instruction.split('').forEach((direction) => {
      code = fnMap[direction](code);
      console.log(direction, code);
    });
    lockCode.push(code);
    return lockCode;
  }, []);

  //Convert
};



function getRowStartValues(maxVal) {
  const halfVal = Math.ceil(maxVal / 2);
  const rowStartVals = [];
  for (let i = 1, inc = 1; i <= maxVal;) {
    rowStartVals.push(i);
    i += inc;
    inc = i > halfVal ? inc - 2 : inc + 2;
  }
  return rowStartVals;
}


function findStartRowIdx(val, startRowVals) {
  const index = startRowVals.findIndex((el) => val < el);
  if (index === -1 && startRowVals[startRowVals.length - 1] === val) {
    return startRowVals.length - 1;
  } else {
    return index - 1;
  }
}