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
export function dateFormatAgo(value: string): string {
  const date = new Date(value);

  // If date is not a valid Date object, return an empty string
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }

  // Check browser compatibility
  // If no available, return the date formated
  if (!Intl || (!Intl.RelativeTimeFormat && typeof Intl.RelativeTimeFormat !== 'function')) {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'long'
    }

    return date.toLocaleString('fr-FR', options);
  }

  const now = new Date();
  const deltaDays = Math.max(Math.round((now.getTime() - date.getTime()) / 86400000), 0);
  const relativeFormatter = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' });

  // Today, yesterday or two days ago
  if (deltaDays >= 0 && deltaDays <= 2) {
    return relativeFormatter.format(-deltaDays, 'day');
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  // Less than a month
  if (date > oneMonthAgo) {
    return `${deltaDays} jours`;
  }

  // More than one month
  const dateFormatter = Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' });
  const overOneMonthAgo = dateFormatter.format(date);
  return `le ${overOneMonthAgo}`;
}

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
export function dateTimeFormatAgo(value: string, displayTime: boolean = false): string {
  const date = new Date(value);

  // If date is not a valid Date object, return an empty string
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();

  // Check browser compatibility
  // If no available, return the date formated
  if (!Intl || !Intl.RelativeTimeFormat && typeof Intl.RelativeTimeFormat !== 'function') {
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: 'long'
    }

    if (displayTime) {
      options.timeStyle = 'short'
    }

    return date.toLocaleString('fr-FR', options);
  }

  const relativeFormatter = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' });

  const deltaSeconds = Math.max(Math.round((now.getTime() - date.getTime()) / 1000), 0);

  // Less than a minute
  if (deltaSeconds <= 60) {
    return relativeFormatter.format(-deltaSeconds, 'second');
  }

  const deltaMinutes = Math.round(deltaSeconds / 60);

  // Less than an hour
  if (deltaMinutes < 60) {
    return relativeFormatter.format(-deltaMinutes, 'minute');
  }

  const deltaHours = Math.round(deltaMinutes / 60);

  // Less than a day
  if (deltaHours < 24) {
    return relativeFormatter.format(-deltaHours, 'hour');
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const timeFormatter = Intl.DateTimeFormat('fr-FR', {
    timeStyle: 'short'
  });

  const deltaDays = Math.round(deltaHours / 24);

  // Less than a month
  if (date > oneMonthAgo) {
    let output = relativeFormatter.format(-deltaDays, 'day');

    // Is yesterday or displayTime is set to true : display time
    if (deltaDays < 2 || displayTime) {
      output += ` à ${timeFormatter.format(date)}`;
    }
    return output;
  }

  // Older than a month, display the date (not relative)
  const dateFormatterOptions: Intl.DateTimeFormatOptions = {
    dateStyle: 'long',
  };

  if (displayTime) {
    dateFormatterOptions.timeStyle = 'short';
  }

  const dateFormatter = Intl.DateTimeFormat('fr-FR', dateFormatterOptions);

  return `le ${dateFormatter.format(date)}`;
}
