const currencyFormater = Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
});

export function simoleon(value: number) {
  return `§${currencyFormater.format(value)}`;
}
