import {
  ProducerData,
  ProductData,
} from './types';

export default class Product {
  constructor(
    private readonly data_: ProductData,
    readonly producer: ProducerData,
    readonly deps: { product: Product; count: number }[],
  ) {}

  get name() {
    return this.data_.name;
  }

  get time() {
    return this.data_.time;
  }

  get price() {
    return this.data_.price;
  }
}
