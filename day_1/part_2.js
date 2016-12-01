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
  const visitedSet = new Set('0,0');
  let solution = null;

  const finalCoords = instructions.reduce((pstate, [rotate, ...s]) => {
    const steps = parseInt(s.join(''), 10);
    const state = pstate;
    orientationIndex = (orientationIndex + rotateMap[rotate] + 4) % 4;

    for (let i = 0; i < steps; ++i) {
      const orientation = orientationList[orientationIndex];
      state[0] += orientation[0];
      state[1] += orientation[1];
      const serialisedState = state.join(',');

      if (visitedSet.has(serialisedState) && solution === null) {
        solution = Math.abs(state[0]) + Math.abs(state[1]);
      } else {
        visitedSet.add(serialisedState);
      }
    }

    return state;
  }, [0, 0]);

  return solution || Math.abs(finalCoords[0]) + Math.abs(finalCoords[1]);
};
