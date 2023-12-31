import { assertTrue } from '@dozerg/condition';

import { Product } from './types';

export interface ProduceStep {
  product: Product;
  count: number;
  deps: ProduceStep[];
  start: number;
  end: number;
}

interface Params {
  steps: ProduceStep[];
  producers: Map<string, { time: number; step: ProduceStep }>;
}

export function getProducePlan(products: Product[]) {
  const p: Params = { steps: [], producers: new Map() };
  products.forEach(product => produceSteps(product, 0, p));
  normalise(p.steps);
  return p.steps;
}

/**
 * Deps will be invalid after optimization.
 */
export function optimiseSteps(steps: ProduceStep[]) {
  steps.forEach(optimiseStep);
  steps.sort(compare);
  const newSteps = steps.reduce((r, s) => {
    if (r.length > 0) {
      const p = r.find(
        a => a !== s && a.product === s.product && (a.start === s.start || a.end === s.start),
      );
      if (p) {
        p.count += s.count;
        if (p.end === s.start) p.end = s.end;
      } else r.push(s);
    } else r.push(s);
    return r;
  }, new Array<ProduceStep>());
  newSteps.sort(compare);
  return newSteps;
}

function produceSteps(product: Product, time: number, p: Params) {
  const { producer } = product;
  const { time: producerTime, step: next } = getProducerTime(product, p);
  const end = Math.min(time, producerTime);
  const start = end - product.time;
  const step: ProduceStep = { product, start, end, deps: [], count: 1 };
  p.steps.push(step);
  if (producer.sequential) p.producers.set(producer.name, { time: start, step });
  step.deps = product.deps.flatMap(d =>
    new Array<Product>(d.count).fill(d.product).map(a => produceSteps(a, start, p)),
  );
  if (next) next.deps.push(step);
  return step;
}

function getProducerTime(product: Product, p: Params) {
  const { producer } = product;
  if (!producer.sequential) return { time: 0 };
  const record = p.producers.get(producer.name);
  return { ...record, time: record?.time ?? 0 };
}

function normalise(steps: ProduceStep[]) {
  const offset = -Math.min(...steps.map(s => s.start));
  steps.forEach(s => {
    s.start += offset;
    s.end += offset;
  });
  steps.sort(compare);
}

function optimiseStep(step: ProduceStep) {
  if (step.deps.length < 1) {
    step.end -= step.start;
    step.start = 0;
    return step.end;
  }
  const start = Math.max(...step.deps.map(s => optimiseStep(s)));
  assertTrue(start <= step.start);
  const offset = step.start - start;
  step.end -= offset;
  step.start -= offset;
  return step.end;
}

function compare(a: ProduceStep, b: ProduceStep) {
  const s = a.start - b.start;
  if (s !== 0) return s;
  return a.end - b.end;
}
