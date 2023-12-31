#!/usr/bin/env node

import args from 'args';

import {
  findProduct,
  getProducePlan,
  ProduceStep,
  timeStr,
} from '../game';
import { formatTable } from './helper';

interface Event {
  step: ProduceStep;
  event: 'start' | 'end';
}

interface TimeEvents {
  time: number;
  events: Event[];
}

function main(argv: string[]) {
  // @ts-expect-error: Disable options type check
  args.parse(argv, { value: '<Product Names>' });
  const names = args.sub;
  if (!names || names.length < 1) args.showHelp();

  const products = names.map(findProduct);
  const { steps } = getProducePlan(products);
  print(steps);
}

function print(steps: ProduceStep[]) {
  const events = toEvents(steps);
  const table = toTable(steps, events);
  const names = steps.map(s => s.product.name + (s.count === 1 ? '' : `-${s.count}`));
  const title = ['Time', ...names];
  const producers = steps.map(s => `(${s.product.producer})`);
  const subTitle = ['', ...producers];
  const output = formatTable([title, subTitle], table);
  process.stdout.write(output);
  process.stdout.write('\n');
}

/**
 * Transform steps to events.
 */
function toEvents(steps: ProduceStep[]): TimeEvents[] {
  const eventsMap = steps.reduce((r, step) => {
    update(r, step, step.start, 'start');
    update(r, step, step.end, 'end');
    return r;
  }, new Map<number, Event[]>());
  return [...eventsMap.entries()]
    .map(([time, events]) => ({ time, events }))
    .sort((a, b) => a.time - b.time);
}

/**
 * Translate events to table. The first column is Time.
 */
function toTable(steps: ProduceStep[], events: TimeEvents[]) {
  return events.map(t => {
    const row = [timeStr(t.time)];
    steps.forEach((s, i) => {
      row[i + 1] =
        s.start === t.time
          ? '*'
          : s.start < t.time && t.time < s.end
            ? '|'
            : t.time === s.end
              ? '⊥'
              : '';
    });
    return row;
  });
}

function update(
  events: Map<number, Event[]>,
  step: ProduceStep,
  time: number,
  event: Event['event'],
) {
  const s = events.get(time) ?? [];
  s.push({ step, event });
  events.set(time, s);
}

main(process.argv);
