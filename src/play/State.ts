import { assertNonNull } from '@dozerg/condition';

import {
  ProducerData,
  ProductData,
} from '../game';
import Producer from './Producer';

export default class State {
  private storage_ = new Map<ProductData, number>();
  private producers_: Producer[];

  constructor(producers: ProducerData[]) {
    this.producers_ = producers.map(p => new Producer(p));
  }

  store(production: ProductData, count: number = 1) {
    const c = this.storage_.get(production) ?? 0;
    this.storage_.set(production, c + count);
  }

  produce(production: ProductData) {
    const producer = this.producers_.find(p => p.name === production.producer);
    assertNonNull(producer);
  }
}
