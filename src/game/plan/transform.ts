import { assertNonNull } from '@dozerg/condition';

import {
  ProducerData,
  ProductData,
} from '../data';
import {
  Task,
  Worker,
} from './algo';
import { ProduceStep } from './types';

interface Data {
  name: string;
  count: number;
}

type ATask = Task<Data>;

interface Params {
  allProducts: ProductData[];
  workers: Worker[];
  result: ATask[];
}

export function translateToTasks(
  products: ProductData[],
  allProducts: ProductData[],
  allProducers: ProducerData[],
) {
  const workers = allProducers.filter(p => p.sequential).map<Worker>(p => ({ name: p.name }));
  const p: Params = { allProducts, workers, result: [] };
  products.forEach(pp => expandProduct(pp, 1, p));
  return p.result;
}

export function translateToSteps(tasks: ATask[], allProducts: ProductData[]): ProduceStep[] {
  return tasks.map(t => {
    const product = allProducts.find(p => p.name === t.data.name);
    assertNonNull(product);
    assertNonNull(t.start);
    return { product, count: t.data.count, start: t.start, end: t.start + t.time };
  });
}

function expandProduct(product: ProductData, count: number, p: Params, next?: ATask) {
  const worker = p.workers.find(w => w.name === product.producer);
  const dataArray = !worker
    ? [{ name: product.name, count }]
    : new Array<Data>(count).fill({ name: product.name, count: 1 });
  return dataArray.map(data => {
    const task: ATask = { data, time: product.time, next };
    p.result.push(task);
    if (worker) {
      assertNonNull(product.deps);
      const tasks = product.deps.flatMap(d => {
        const pp = p.allProducts.find(e => e.name === d.name);
        assertNonNull(pp);
        return expandProduct(pp, d.count, p, task);
      });
      task.deps = { worker, tasks };
    }
    return task;
  });
}
