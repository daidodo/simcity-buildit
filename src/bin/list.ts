import {
  Production,
  simoleon,
} from '../game';

export function listSummary(productions: Production[]) {
  const title = ['Name', 'Time', 'Price'];
  const table = productions.map(p => [p.name, p.totalTimeString, simoleon(p.price)]);
  const output = format(title, table);
  process.stdout.write(output);
  process.stdout.write('\n');
}

function format(title: string[], table: string[][]) {
  return [title, ['---'], ...table].map(a => a.join('\t')).join('\n');
}
