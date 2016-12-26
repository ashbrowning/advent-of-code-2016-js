'use strict';

class Display {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.grid = this.initGrid(x, y);
  }

  initGrid(x, y) {
    const arr = [];
    for (let i = 0; i < x; ++i) {
      arr.push(new Array(y).fill(0));
    }
    return arr;
  }

  setRect(x, y) {
    for (let i = 0; i < x; ++i) {
      for (let j = 0; j < y; ++j) {
        this.grid[i][j] = 1;
      }
    }
  }

  rotateRow(index, delta) {
    const tmp = [];
    for (let i = 0; i < this.x; ++i) {
      tmp.push(this.grid[i][index]);
      if (tmp.length > delta) {
        this.grid[i][index] = tmp.shift();
      }
    }
    tmp.forEach((val, i) => {
      this.grid[i][index] = val;
    });
  }

  rotateCol(index, delta) {
    const tmp = [];
    for (let i = 0; i < this.y; ++i) {
      tmp.push(this.grid[index][i]);
      if (tmp.length > delta) {
        this.grid[index][i] = tmp.shift();
      }
    }
    tmp.forEach((val, i) => {
      this.grid[index][i] = val;
    });
  }

  countGrid() {
    return this.grid.reduce((memo, arr) =>
      arr.reduce((inMemo, el) => el === 1 ? inMemo + 1 : inMemo, memo), 0);
  }

  print() {
    for (let j = 0; j < this.grid[0].length; ++j) {
      let str = '';
      for (let i = 0; i < this.grid.length; ++i) {
        str += this.grid[i][j];
      }
      console.log(str);
    }
  }
}

module.exports = (inputArray) => {
  const getRect = (inst) => inst.match(/(\d+)/g);

  const doRotate = (display, lineArr) => {
    const index = parseInt(lineArr[2].match(/(\d+)/)[0], 10);
    const delta = parseInt(lineArr[4], 10);

    if (lineArr[1] === 'row') {
      display.rotateRow(index, delta);
    } else if (lineArr[1] === 'column') {
      display.rotateCol(index, delta);
    }
  };

  const getProcessLineFn = (display) =>
    (lineArr) => {
      switch (lineArr[0]) {
        case 'rect':
          display.setRect(...getRect(lineArr[1]));
          break;
        case 'rotate':
          doRotate(display, lineArr);
          break;
        default:
      }
    };

  const display = new Display(50, 6);
  inputArray.map((s) => s.split(' ')).forEach(getProcessLineFn(display));
  display.print();
  return display.countGrid();
};
