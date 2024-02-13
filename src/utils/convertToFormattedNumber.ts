function convertToFormattedNumber(amount: number): string {
  // Convert the raw number to a string and insert commas for thousands separators
  return parseFloat(amount.toString()).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
