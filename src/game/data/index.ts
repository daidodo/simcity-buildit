import { ALL_PRODUCTS } from './data';

export * from './data';
export * from './types'

export function findProduct(name: string) {
  const product = ALL_PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!product) {
    throw Error(`Cannot find product name: ${name}\n`);
  }
  return product;
}
