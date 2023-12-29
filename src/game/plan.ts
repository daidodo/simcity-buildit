import { assertTrue } from '@dozerg/condition';

import Production from './Production';

export interface ProduceStep {
  production: Production;
  count: number;
  deps: ProduceStep[];
  start: number;
  end: number;
}

export function getProducePlan(production: Production) {
  const steps = new Array<ProduceStep>();
  produceSteps(production, 1, 0, steps);
  normalise(steps);
  return steps;
}

/**
 * Deps will be invalid after optimization.
 */
export function optimiseSteps(steps: ProduceStep[]) {
  steps.forEach(optimiseStep);
  const newSteps = steps.reduce((r, s) => {
    if (r.length < 1) r.push(s);
    else {
      const p = r.find(a => a !== s && a.production === s.production && a.start === s.start);
      if (!p) r.push(s);
      else p.count += s.count;
    }
    return r;
  }, new Array<ProduceStep>());
  newSteps.sort(compare);
  return newSteps;
}

function produceSteps(production: Production, count: number, time: number, steps: ProduceStep[]) {
  const start = time - production.time;
  const step: ProduceStep = { production, count, start, end: time, deps: [] };
  const req = production.requirements.reduce(
    (map, p) => map.set(p, (map.get(p) ?? 0) + 1),
    new Map<Production, number>(),
  );
  step.deps = [...req.entries()].map(([p, c]) => produceSteps(p, c * count, start, steps));
  steps.push(step);
  return step;
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
  const e = a.end - b.end;
  if (e !== 0) return e;
  return b.count - a.count;
}
