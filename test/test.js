var expect = require('chai').expect;
var index = require('../build/bundle.js');

describe('Add function test', () => {
    it('should return 2', () => {
        var result = index.add(1, 1);
        expect(result).to.equal(2);
    });
    it('should return 100', () => {
        var result = index.add(50.5, 49.5);
        expect(result).to.equal(100);
    });
    it('should return -50', () => {
        var result = index.add(-100, 50);
        expect(result).to.equal(-50);
    });
    it('should ignore the third argument', () => {
        var result = index.add(1, 2, 4);
        expect(result).to.equal(3); 
    });
});

describe('Subtract function test', () => {
    it('should return 0', () => {
        var result = index.subtract(1, 1);
        expect(result).to.equal(0);
    });
    it('should return -100', () => {
        var result = index.subtract(0, 100);
        expect(result).to.equal(-100);
    });
    it('should return -1', () => {
        var result = index.subtract(Number.MIN_VALUE, 1);
        expect(result).to.equal(-1);
    });
    it('should return 0.5', () => {
        var result = index.subtract(1, 0.5);
        expect(result).to.equal(0.5);
    });
});

describe('Square function test', () => {
    it('2^2 should return 4', () => {
        var result = index.square(2);
        expect(result).to.equal(4);
    });
    it('12^2 should return 144', () => {
        var result = index.square(12);
        expect(result).to.equal(144);
    });
});
describe('Cube function test', () => {
    it('2^3 should return 16', () => {
        var result = index.cube(2);
        expect(result).to.equal(8);
    });
    it('12^3 should return 1728', () => {
        var result = index.cube(12);
        expect(result).to.equal(1728);
    });
});