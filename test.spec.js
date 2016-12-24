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
  it('should give correct answers to day 4 part 1', () => {
    expect(launcher(4, 1)).toBe(245102);
  });
  it('should give correct answers to day 4 part 2', () => {
    expect(launcher(4, 2)).toBe(324);
  });
  it('should give correct answers to day 5 part 1', () => {
    expect(launcher(5, 1)).toBe('4543c154');
  });
  it('should give correct answers to day 5 part 2', () => {
    expect(launcher(5, 2)).toBe('1050cbbd');
  });
  it('should give correct answers to day 6 part 1', () => {
    expect(launcher(6, 1)).toBe('mlncjgdg');
  });
  it('should give correct answers to day 6 part 2', () => {
    expect(launcher(6, 2)).toBe('bipjaytb');
  });
  it('should give correct answers to day 7 part 1', () => {
    expect(launcher(7, 1)).toBe(115);
  });
  it('should give correct answers to day 7 part 2', () => {
    expect(launcher(7, 2)).toBe(231);
  });
});
