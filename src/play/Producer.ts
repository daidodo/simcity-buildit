import { Moment } from 'moment';

import {
  ProducerData,
  ProductData,
} from '../game';

interface Slot {
  production: ProductData;
  start?: Moment;
}

export default class Producer {
  private slots: Slot[] = [];

  constructor(private readonly data_: ProducerData) {}

  get name() {
    return this.data_.name + this.slots.length;
  }
}
