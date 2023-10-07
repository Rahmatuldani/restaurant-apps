const detectTriangle = (sideA, sideB, sideC) => {
  [sideA, sideB, sideC].forEach((side) => {
    if (!Number.isInteger(side)) {
      throw new Error('Sides have to be Integer');
    }
    if (side < 1) {
      throw new Error('Strange Triangle');
    }
  });
};

describe('Detect the triangle', () => {
  it('Should fail if the sides are not integer', () => {
    expect(() => detectTriangle('a', 2, 2)).toThrowError('Sides have to be Integer');
    expect(() => detectTriangle(1, 'a', 2)).toThrowError('Sides have to be Integer');
    expect(() => detectTriangle(1, 2, 'a')).toThrowError('Sides have to be Integer');

    expect(() => detectTriangle(' ', 2, 2)).toThrowError('Sides have to be Integer');
  });
});
