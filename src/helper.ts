import parse from 'parse-duration';

export function t(str: string) {
  const r = parse(str, 's');
  if (r === undefined) throw Error(`Invalid duration: ${str}`);
  return r;
}
