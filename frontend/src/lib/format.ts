/** Formats an amount as currency, e.g. 1234.5 -> "$1,234.5", -20 -> "-$20". */
export function formatCurrency(amount: number, sign: "auto" | "+" | "-" = "auto") {
  const prefix = sign === "auto" ? (amount < 0 ? "-" : "") : sign;
  return `${prefix}$${Math.abs(amount).toLocaleString()}`;
}
