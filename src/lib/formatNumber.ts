const formatNumber = (value: number, { digits }: { digits: number }): string =>
  // Using undefined to let the browser decide the locale
  Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);

export default formatNumber;
