import args from 'args';

args.options([
  {
    name: 'list',
    description: 'List summary',
  },
]);

export function parseArgs(argv: string[]) {
  return args.parse(argv);
}
