import {
  ProducerData,
  ProductData,
} from './types';

export default class Product {
  constructor(
    private readonly data_: ProductData,
    readonly producer: ProducerData,
    readonly totalTimeEst: number, // estimated total time.
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

  pricePerHours(hours: number) {
    if (this.totalTimeEst < 3600 * hours) return this.data_.price;
    return (this.data_.price * 3600 * hours) / this.totalTimeEst;
  }
}
