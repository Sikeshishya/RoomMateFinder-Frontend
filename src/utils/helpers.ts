
/**
 * Format a currency value
 * @param value Number to format as currency
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  /**
   * Truncate a string to a specified length
   * @param str String to truncate
   * @param length Maximum length
   * @returns Truncated string with ellipsis if needed
   */
  export const truncateString = (str: string, length: number): string => {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  };
  
  /**
   * Convert a string to title case
   * @param str String to convert
   * @returns String in title case
   */
  export const toTitleCase = (str: string): string => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
  };
  
  /**
   * Extract the first part of an email address (before @)
   * @param email Email address
   * @returns Username part of the email
   */
  export const extractUsernameFromEmail = (email: string): string => {
    return email.split('@')[0];
  };
  
  /**
   * Check if a value is empty (null, undefined, empty string, or empty array)
   * @param value Value to check
   * @returns True if the value is empty
   */
  export const isEmpty = (value: any): boolean => {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  };
  