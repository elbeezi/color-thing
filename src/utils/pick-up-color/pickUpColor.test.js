import pickUpColor, { pickUpColorValue } from './pickUpColor';

describe('pickUpColorValue', () => {
  describe('given a value A, a value B, when a step amount', () => {
    describe('when A is less than B', () => {
      describe('when A plus step amount would be less than B', () => {
        it('returns A plus step amount', () => {
          const output = pickUpColorValue(0, 10, 5);
          const expected = 5;
          expect(output).toEqual(expected);
        });
      });
      describe('when A plus step amount would be equal to B', () => {
        it('returns B', () => {
          const output = pickUpColorValue(-10, 0, 10);
          const expected = 0;
          expect(output).toEqual(expected);
        });
      });
      describe('when A plus step amount would be greater than B', () => {
        it('returns B', () => {
          const output = pickUpColorValue(300, 350, 150);
          const expected = 350;
          expect(output).toEqual(expected);
        });
      });
    });

    describe('when A is greater than B', () => {
      describe('when A minus step amount would be greater than B', () => {
        it('returns A minus step amount', () => {
          const output = pickUpColorValue(10, 0, 1);
          const expected = 9;
          expect(output).toEqual(expected);
        });
      });
      describe('when A minus step amount would be equal to B', () => {
        it('returns B', () => {
          const output = pickUpColorValue(100, 50, 50);
          const expected = 50;
          expect(output).toEqual(expected);
        });
      });
      describe('when A minus step amount would be less than B', () => {
        it('returns B', () => {
          const output = pickUpColorValue(189, 53, 1000);
          const expected = 53;
          expect(output).toEqual(expected);
        });
      });
    });

    describe('when A is equal to B', () => {
      it('returns A', () => {
        const output = pickUpColorValue(50, 50, 500);
        const expected = 50;
        expect(output).toEqual(expected);
      });
    });
  });
});

describe('pickUpColor', () => {
  describe('given a hex color A, a hex color B, and a step amount', () => {
    it('returns a hex color that is one step closer to B from A by the given amount', () => {
      const output = pickUpColor('#00ff00', '#ff00ff', 1);
      const expected = '#01fe01';
      expect(output).toEqual(expected);
    });
  });
});
