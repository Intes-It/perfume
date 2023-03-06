import replace from 'lodash-es/replace';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '0.00' : '0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}
export const formatCurrency = (curr: string) => {
  if (curr.includes('.')) {
    return curr + "0";
  } else {
    return curr + '.' + '0' + '0';
  }
};
