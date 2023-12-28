import timeStringOrigin from 'humanize-duration';
import parse from 'parse-duration';

export function t(str: string) {
  const r = parse(str, 's');
  if (r === undefined) throw Error(`Invalid duration: ${str}`);
  return r;
}

const timeString = timeStringOrigin.humanizer({
  delimiter: '',
  spacer: '',
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});

export { timeString };
