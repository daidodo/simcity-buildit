import { assertTrue } from '@dozerg/condition';

const DEFAULT_OPTIONS = {
  minimalColunmSize: 4,
  spacesBetweenColumns: 2,
};

type Options = Partial<typeof DEFAULT_OPTIONS>;

export function formatTable(title: string[][], content: string[][], options?: Options) {
  // options
  const cs = options?.minimalColunmSize ?? DEFAULT_OPTIONS.minimalColunmSize;
  const sc = options?.spacesBetweenColumns ?? DEFAULT_OPTIONS.spacesBetweenColumns;
  // calc column lengths
  assertTrue(title.length > 0);
  const cl = [...title, ...content].reduce((r, a) => {
    assertTrue(a.length <= r.length);
    for (let i = 0; i < r.length; ++i) {
      if (a[i] === undefined) a[i] = '';
      r[i] = Math.max(r[i], a[i].length);
    }
    return r;
  }, Array(title[0].length).fill(cs));
  const lines = [...title, ['---'], ...content].map(row =>
    row
      .map((c, i) => c.padEnd(cl[i], ' '))
      .join(' '.repeat(sc))
      .trimEnd(),
  );
  return lines.join('\n');
}
