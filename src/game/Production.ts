import { assertNonNull } from '@dozerg/condition';

import { timeString } from './helper';
import {
  ProducerData,
  ProductionData,
} from './types';

export default class Production {
  readonly producer: ProducerData;
  private totalTime_ = 0;
  private requirements_: Production[] = [];

  constructor(
    private readonly data_: ProductionData,
    allProducers: ProducerData[],
  ) {
    const producer = allProducers.find(p => p.name === data_.producer);
    assertNonNull(producer);
    this.producer = producer;
  }

  init(allProductions: Production[]) {
    if (this.totalTime_ > 0) return;
    this.requirements_ =
      this.data_.requirements?.map(name => {
        const requirement = allProductions.find(p => p.name === name);
        assertNonNull(requirement);
        return requirement;
      }) ?? [];
    this.requirements_.forEach(p => p.init(allProductions));
    this.totalTime_ =
      this.requirements_.map(p => p.totalTime).reduce((a, b) => (a > b ? a : b), 0) +
      this.data_.time;
  }

  get name() {
    return this.data_.name;
  }

  get totalTime() {
    return this.totalTime_;
  }

  get totalTimeString() {
    return timeString(this.totalTime * 1000);
  }

  get price() {
    return this.data_.price;
  }
}
