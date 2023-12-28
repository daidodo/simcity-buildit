import {
  ALL_PRODUCERES,
  ALL_PRODUCTIONS,
} from './data';
import Production from './Production';

export * from './simoleon';
export { timeStr } from './time';

export function init() {
  const productions = ALL_PRODUCTIONS.map(data => new Production(data, ALL_PRODUCERES));
  productions.forEach(p => p.init(productions));
  return productions;
}

export { Production };
