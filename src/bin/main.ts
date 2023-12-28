#!/usr/bin/env node

import { init } from '../game';
import { parseArgs } from './args';
import { listSummary } from './list';

function main(argv: string[]) {
  const flags = parseArgs(argv);
  const productions = init();
  if (flags.list) {
    listSummary(productions);
    return;
  }
}

main(process.argv);
