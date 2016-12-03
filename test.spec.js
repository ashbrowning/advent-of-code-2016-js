'use strict';
/* global describe it expect */

const launcher = require('./launcher.js');

describe('Advent of code tests', () => {
  it('should give correct answers to day 1 part 1', () => {
    expect(launcher(1, 1)).toBe(241);
  });
  it('should give correct answers to day 1 part 2', () => {
    expect(launcher(1, 2)).toBe(116);
  });
  it('should give correct answers to day 3 part 1', () => {
    expect(launcher(3, 1)).toBe(993);
  });
  it('should give correct answers to day 3 part 2', () => {
    expect(launcher(3, 2)).toBe(1849);
  });
});
