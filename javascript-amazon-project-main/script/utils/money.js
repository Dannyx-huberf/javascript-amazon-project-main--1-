export function formatCurrency(value) {
  if (typeof value !== 'number') {
    throw new TypeError('Value must be a number');
  }
  return `${(value/100).toFixed(2)}`;
}