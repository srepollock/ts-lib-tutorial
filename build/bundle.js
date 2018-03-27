'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Adds two numbers together
 * @param  {number} x
 * @param  {number} y
 * @returns number
 */
function add(x, y) {
  return x + y;
}
/**
 * Subtracts Y from X.
 * @param  {number} x
 * @param  {number} y
 * @returns number
 */
function subtract(x, y) {
  return x - y;
}
/**
 * Squares a number.
 * @param  {number} x
 * @returns number
 */
function square(x) {
  return Math.pow(x, 2);
}
/**
 * Cubes a number
 * @param  {number} x
 * @returns number
 */
function cube(x) {
  return Math.pow(x, 3);
}

exports.add = add;
exports.subtract = subtract;
exports.square = square;
exports.cube = cube;
