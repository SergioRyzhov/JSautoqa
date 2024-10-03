/**
 * Cleans the text by removing non-numeric characters and returns the numeric value.
 *
 * @param {string} text - The text to clean from non-numeric characters.
 * @returns {number} The numeric value extracted from the text.
 */

export function cleanQuantity(text: string): number {
    if (!text) return 0;
    return parseInt(text.replace(/\D/g, ''), 10);
}