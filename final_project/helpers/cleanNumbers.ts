export function getCleanNumbers (num: string):number {
    const cleanedNumber = num.replace(/[^\d.]/g, '').trim();
    return parseFloat(cleanedNumber);
}