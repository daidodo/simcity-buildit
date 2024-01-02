import { ProductData } from '../data';

export interface ProduceStep {
  product: ProductData;
  count: number;
  start: number;
  end: number;
}
