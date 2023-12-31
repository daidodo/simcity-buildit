const currencyFormater = Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const SIMOLEON = '§';

export function simoleon(value: number) {
  return SIMOLEON + currencyFormater.format(value);
}
