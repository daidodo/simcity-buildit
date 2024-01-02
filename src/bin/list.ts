#!/usr/bin/env node

import args from 'args';

import {
  ALL_PRODUCTS,
  getProducePlan,
  ProductData,
  simoleon,
  SIMOLEON,
  timeStr,
} from '../game';
import { formatTable } from './helper';

args.options([
  { name: 'time', description: 'Sort by prduce time' },
  { name: 'price', description: 'Sort by sale price' },
  {
    name: 'earn',
    description: 'Sort by earnings per n hours, must be positive',
    defaultValue: 4,
    init: s => +s,
  },
  { name: 'count', description: '# of products, must be positive', defaultValue: 1, init: s => +s },
]);

enum SortBy {
  TIME,
  PRICE,
  PRICE_PER_HOUR,
}

type Stats = [string, number, number, number];

function main(argv: string[]) {
  const flags = args.parse(argv);
  if (flags.count < 1 || flags.earn < 1) args.showHelp();
  const sortBy = flags.time ? SortBy.TIME : flags.price ? SortBy.PRICE : SortBy.PRICE_PER_HOUR;
  listSummary(ALL_PRODUCTS, flags.count, sortBy, flags.earn);
}

function listSummary(products: ProductData[], count: number, sortBy: SortBy, hours: number) {
  const table: Stats[] = products.map(p => {
    const { time, pricePerHours } = getTotalTime(p, count, hours);
    return [p.name + (count === 1 ? '' : `-${count}`), time, p.price, pricePerHours];
  });
  sort(table, sortBy);
  const title = ['Name', 'Time', 'Price', `${SIMOLEON}/${hours === 1 ? 'h' : hours + 'h'}`];
  const output = format(title, table);
  process.stdout.write(output);
  process.stdout.write('\n');
}

function getTotalTime(product: ProductData, count: number, hours: number) {
  const { time } = getProducePlan(new Array<ProductData>(count).fill(product));
  return { time, pricePerHours: getPricePerHours(product.price, time, hours) };
}

function getPricePerHours(price: number, totalTime: number, hours: number) {
  if (totalTime < 3600 * hours) return price;
  return (price * 3600 * hours) / totalTime;
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
  return formatTable([title], content);
}

main(process.argv);
