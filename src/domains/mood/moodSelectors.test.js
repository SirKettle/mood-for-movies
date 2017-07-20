import * as moodSelectors from './moodSelectors';

test('cartesianProduct', () => {
  const options = [];
  options.push(['big', 'small']);
  options.push(['red', 'blue']);
  expect(moodSelectors.cartesianProduct(options)).toBe([["big", "red"], ["big", "blue"], ["small", "red"], ["small", "blue"]]);
});
