"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFormatAgo = dateFormatAgo;
exports.dateTimeFormatAgo = dateTimeFormatAgo;
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
function dateFormatAgo(value) {
  var date = new Date(value);

  // If date is not a valid Date object, return an empty string
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }

  // Check browser compatibility
  // If no available, return the date formated
  if (!Intl || !Intl.RelativeTimeFormat && typeof Intl.RelativeTimeFormat !== 'function') {
    var options = {
      dateStyle: 'long'
    };
    return date.toLocaleString('fr-FR', options);
  }
  var now = new Date();
  var deltaDays = Math.max(Math.round((now.getTime() - date.getTime()) / 86400000), 0);
  var relativeFormatter = new Intl.RelativeTimeFormat('fr-FR', {
    numeric: 'auto'
  });

  // Today, yesterday or two days ago
  if (deltaDays >= 0 && deltaDays <= 2) {
    return relativeFormatter.format(-deltaDays, 'day');
  }
  var oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  // Less than a month
  if (date > oneMonthAgo) {
    return "".concat(deltaDays, " jours");
  }

  // More than one month
  var dateFormatter = Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long'
  });
  var overOneMonthAgo = dateFormatter.format(date);
  return "le ".concat(overOneMonthAgo);
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
function dateTimeFormatAgo(value) {
  var displayTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var date = new Date(value);

  // If date is not a valid Date object, return an empty string
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }
  var now = new Date();

  // Check browser compatibility
  // If no available, return the date formated
  if (!Intl || !Intl.RelativeTimeFormat && typeof Intl.RelativeTimeFormat !== 'function') {
    var options = {
      dateStyle: 'long'
    };
    if (displayTime) {
      options.timeStyle = 'short';
    }
    return date.toLocaleString('fr-FR', options);
  }
  var relativeFormatter = new Intl.RelativeTimeFormat('fr-FR', {
    numeric: 'auto'
  });
  var deltaSeconds = Math.max(Math.round((now.getTime() - date.getTime()) / 1000), 0);

  // Less than a minute
  if (deltaSeconds <= 60) {
    return relativeFormatter.format(-deltaSeconds, 'second');
  }
  var deltaMinutes = Math.round(deltaSeconds / 60);

  // Less than an hour
  if (deltaMinutes < 60) {
    return relativeFormatter.format(-deltaMinutes, 'minute');
  }
  var deltaHours = Math.round(deltaMinutes / 60);

  // Less than a day
  if (deltaHours < 24) {
    return relativeFormatter.format(-deltaHours, 'hour');
  }
  var oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);
  var timeFormatter = Intl.DateTimeFormat('fr-FR', {
    timeStyle: 'short'
  });
  var deltaDays = Math.round(deltaHours / 24);

  // Less than a month
  if (date > oneMonthAgo) {
    var output = relativeFormatter.format(-deltaDays, 'day');

    // Is yesterday or displayTime is set to true : display time
    if (deltaDays < 2 || displayTime) {
      output += " \xE0 ".concat(timeFormatter.format(date));
    }
    return output;
  }

  // Older than a month, display the date (not relative)
  var dateFormatterOptions = {
    dateStyle: 'long'
  };
  if (displayTime) {
    dateFormatterOptions.timeStyle = 'short';
  }
  var dateFormatter = Intl.DateTimeFormat('fr-FR', dateFormatterOptions);
  return "le ".concat(dateFormatter.format(date));
}
//# sourceMappingURL=date_format.js.map