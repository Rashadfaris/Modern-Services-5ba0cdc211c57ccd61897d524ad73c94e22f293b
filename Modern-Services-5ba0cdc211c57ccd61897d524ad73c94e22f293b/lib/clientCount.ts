/**
 * Calculates the current client count based on automatic yearly updates.
 * 
 * Base: 56 clients as of December 28, 2024
 * Updates: Adds 12 clients every year on December 28th
 * 
 * Logic:
 * - Before Dec 28, 2025: 56 clients
 * - On/After Dec 28, 2025: 68 clients (56 + 12)
 * - On/After Dec 28, 2026: 80 clients (56 + 24)
 * - And so on...
 * 
 * @returns The current client count as a number
 */
export function getClientCount(): number {
  // Base: 56 clients as of December 28, 2024
  const baseYear = 2024;
  const baseCount = 56;
  const yearlyIncrement = 12;
  
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Calculate how many December 28ths have passed since the base date
  // We count each year where we've reached or passed December 28th
  let yearsPassed = 0;
  
  // Check each year from the year after base year to current year
  for (let year = baseYear + 1; year <= currentYear; year++) {
    const dec28ThisYear = new Date(year, 11, 28); // December 28 of this year (month 11 = December)
    
    if (today >= dec28ThisYear) {
      // We've passed December 28th of this year, so add 12 clients
      yearsPassed++;
    }
  }
  
  // Calculate total client count
  const totalCount = baseCount + (yearsPassed * yearlyIncrement);
  
  return totalCount;
}

/**
 * Gets the client count formatted as a string with "+" suffix
 * @returns Formatted string like "56+", "68+", etc.
 */
export function getClientCountFormatted(): string {
  return `${getClientCount()}+`;
}

