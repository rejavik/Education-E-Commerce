export function formatMoney(number: number | undefined) {
  return number?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

export function formatMoneyWithSymbol(number: number | undefined) {
  return number?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });
}

export function formatMoneyWithSymbolAndDecimals(
  number: number | undefined,
  decimals: number = 2
) {
  return number?.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatMoneyWithDecimals(
  number: number | undefined,
  decimals: number = 2
) {
  return number?.toLocaleString("it-IT", {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
