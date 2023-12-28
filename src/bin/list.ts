import args from 'args';

import { assertTrue } from '@dozerg/condition';

import {
  init,
  Production,
  simoleon,
  SIMOLEON,
  timeStr,
} from '../game';

args.options([
  {
    name: 'time',
    description: 'Sort by prduce time',
  },
  {
    name: 'price',
    description: 'Sort by sale price',
  },
  {
    name: 'earn',
    description: 'Sort by earnings per n hours',
    defaultValue: 4,
    init: s => +s,
  },
]);

enum SortBy {
  TIME,
  PRICE,
  PRICE_PER_HOUR,
}

type Stats = [string, number, number, number];

function listSummary(productions: Production[], sortBy: SortBy, hours: number) {
  const title = ['Name', 'Time', 'Price', `${SIMOLEON}/${hours === 1 ? 'h' : hours + 'h'}`];
  const table: Stats[] = productions.map(p => [
    p.name,
    p.totalTime,
    p.price,
    p.pricePerHours(hours),
  ]);
  sort(table, sortBy);
  const output = format(title, table);
  process.stdout.write(output);
  process.stdout.write('\n');
}

function sort(table: Stats[], sortBy: SortBy) {
  switch (sortBy) {
    case SortBy.TIME:
      table.sort((a, b) => b[1] - a[1]);
      break;
    case SortBy.PRICE:
      table.sort((a, b) => b[2] - a[2]);
      break;
    default:
      table.sort((a, b) => b[3] - a[3]);
  }
}

function format(title: string[], table: Stats[]) {
  const content = table.map(row => {
    const [name, time, price, pricePerHour] = row;
    return [name, timeStr(time), simoleon(price), simoleon(pricePerHour)];
  });
  // Calc column lengths
  const cl = content.reduce((r, a) => {
    assertTrue(r.length === a.length);
    for (let i = 0; i < r.length; ++i) r[i] = Math.max(r[i], a[i].length);
    return r;
  }, Array(title.length).fill(4));
  const lines = [title, ['---'], ...content].map(row =>
    row.map((c, i) => c.padEnd(cl[i], ' ')).join('  '),
  );
  return lines.join('\n');
}

function main(argv: string[]) {
  const flags = args.parse(argv);
  const productions = init();
  const sortBy = flags.time ? SortBy.TIME : flags.price ? SortBy.PRICE : SortBy.PRICE_PER_HOUR;
  listSummary(productions, sortBy, flags.earn);
}

main(process.argv);