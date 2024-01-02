import {
  ALL_PRODUCERES,
  ALL_PRODUCTS,
  ProductData,
} from '../data';
import { solve } from './algo';
import {
  translateToSteps,
  translateToTasks,
} from './transform';
import { ProduceStep } from './types';

export function getProducePlan(products: ProductData[]) {
  const tasks = translateToTasks(products, ALL_PRODUCTS, ALL_PRODUCERES);
  const time = solve(tasks);
  const steps = optimiseSteps(translateToSteps(tasks, ALL_PRODUCTS));
  return { time, steps };
}

function optimiseSteps(steps: ProduceStep[]) {
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

function compare(a: ProduceStep, b: ProduceStep) {
  const s = a.start - b.start;
  if (s !== 0) return s;
  return a.end - b.end;
}
