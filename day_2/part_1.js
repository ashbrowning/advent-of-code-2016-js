'use strict';

module.exports = inputArray => {
  const x = 3;
  const y = 3;
  const max = x * y;
  const fnMap = {
    'U': (val) => (val - x) <= 0 ? val : val - x,
    'D': (val) => (val + x) > max ? val : val + x,
    'L': (val) => ((val - 1) % x === 0) ? val : val - 1,
    'R': (val) => ((val + 1) % x === 1) ? val : val + 1,

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

  console.log(lockCode);
};
