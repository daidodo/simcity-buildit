import { ProducerData } from '../data';

export interface Product {
  name: string;
  time: number;
  price: number;
  producer: ProducerData;
  deps: { product: Product; count: number }[];
}
