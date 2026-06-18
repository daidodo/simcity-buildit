import { ProducerData } from '../game';

export default class Producer {
  constructor(private readonly data_: ProducerData) {}

  get name() {
    return this.data_.name;
  }
}
