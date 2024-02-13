export function convertToFormattedNumber(amount: number): string {
  return parseFloat(amount.toString()).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
