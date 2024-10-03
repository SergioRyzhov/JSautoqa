/**
 * Cleans a price string by removing all non-numeric and non-decimal characters,
 * and returns the result as a floating-point number.
 *
 * The function removes any characters except digits and the decimal point (if present),
 * trims any leading or trailing whitespace, and converts the cleaned string to a `number`.
 *
 * @param {string} num - The price string to clean (e.g., "$12.34", "€ 45.67", etc.).
 * @returns {number} The cleaned price as a floating-point number.
 */
export function getCleanPrice(num: string): number {
  const cleanedNumber = num.replace(/[^\d.]/g, '').trim();
  return parseFloat(cleanedNumber);
}
