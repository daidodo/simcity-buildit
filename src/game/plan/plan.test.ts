import { assertNonNull } from '@dozerg/condition';

import { ALL_PRODUCTS } from '../data';
import { getProducePlan } from './plan';

describe('Plan', () => {
  const name = 'Burger';
  const product = ALL_PRODUCTS.find(p => p.name === name);
  assertNonNull(product);
  it('should work', () => {
    const { time } = getProducePlan([product]);
    expect(time > 0).toBeTruthy();
  });
});
