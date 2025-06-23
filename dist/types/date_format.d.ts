/**
 * Format date to display a readable string in French
 * The return value is relative to the current time using Intl API
 * If older than two days but less than one month, display the number of days
 * If older than a month, display the date
 * Date must be in the past, if not it will be formatted to the current date
 *
 * @param {string} value date string to format
 * @return the formatted date string
 */
export declare function dateFormatAgo(value: string): string;
/**
 * Format date or datetime to display a readable string in French
 * The return value is relative to the current time using Intl API
 * If older than a month, display the date (and time if displayTime is true)
 * Date must be in the past, if not it will be formatted to the current time
 *
 * @param {string} value date(time) string to format
 * @param {boolean} displayTime boolean display time when the day is before today
 * @return the formatted date(time) string
 */
export declare function dateTimeFormatAgo(value: string, displayTime?: boolean): string;
