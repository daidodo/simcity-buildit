import Production from './Production';

export interface ProduceStep {
  production: Production;
  count: number;
  start: number;
  end: number;
}

export function getProducePlan(production: Production) {
  const steps = produceSteps(production, 1, 0, []);
  normalise(steps);
  return steps;
}

function produceSteps(production: Production, count: number, time: number, steps: ProduceStep[]) {
  const start = time - production.time;
  steps.push({ production, count, start, end: time });
  const req = production.requirements.reduce(
    (map, p) => map.set(p, (map.get(p) ?? 0) + 1),
    new Map<Production, number>(),
  );
  [...req.entries()].forEach(([production, count]) =>
    produceSteps(production, count, start, steps),
  );
  return steps;
}

function normalise(steps: ProduceStep[]) {
  const offset = -Math.min(...steps.map(s => s.start));
  steps.forEach(s => {
    s.start += offset;
    s.end += offset;
  });
  steps.sort((a, b) => a.start - b.start);
}
