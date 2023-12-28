#!/usr/bin/env node

import args from 'args';

args.command('list', 'List productions summary');

function main(argv: string[]) {
  args.parse(argv);
}

main(process.argv);
