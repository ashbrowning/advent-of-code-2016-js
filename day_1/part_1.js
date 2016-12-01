'use strict';

module.exports = inputArray => {
  const instructions = inputArray[0].split(', ');
  const orientationList = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const rotateMap = {
    L: -1,
    R: 1,
  };

  let orientationIndex = 0;
  const finalCoords = instructions.reduce((pstate, [rotate, ...s]) => {
    const steps = parseInt(s.join(''), 10);
    const state = pstate;

    orientationIndex = (orientationIndex + rotateMap[rotate] + 4) % 4;

    const orientation = orientationList[orientationIndex];
    state[0] += orientation[0] * steps;
    state[1] += orientation[1] * steps;

    return state;
  }, [0, 0]);

  return Math.abs(finalCoords[0]) + Math.abs(finalCoords[1]);
};
