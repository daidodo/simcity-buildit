import { assertNonNull } from '@dozerg/condition';

import {
  ALL_PRODUCERES,
  ALL_PRODUCTS,
  ProductData,
} from '../data';
import { Product } from './types';

export function init() {
  const products = new Array<Product>();
  ALL_PRODUCTS.forEach(data => getProduct(data, products));
  return products;
}

function getProduct(data: ProductData, products: Product[]): Product {
  const exist = products.find(p => p.name === data.name);
  if (exist) return exist;
  const producer = ALL_PRODUCERES.find(p => p.name === data.producer);
  assertNonNull(producer);
  const deps = getDeps(data, products);
  const product: Product = { ...data, producer, deps };
  products.push(product);
  return product;
}

function getDeps(data: ProductData, products: Product[]) {
  return (
    data.deps?.map(d => {
      const pd = ALL_PRODUCTS.find(p => p.name === d.name);
      assertNonNull(pd);
      return { product: getProduct(pd, products), count: d.count };
    }) ?? []
  );
}
