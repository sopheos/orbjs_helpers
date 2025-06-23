/**
 * @param {number|string} value
 * @param {number} precision
 * @returns {number}
 */
export function numberFormat(value, precision) {
  var numberValue = typeof value === 'number' ? value : parseFloat(value);
  return parseFloat(numberValue.toPrecision(precision));
}

/**
 * @param {number} value
 * @param {string} unit
 * @returns {string}
 */
export function units(value, unit) {
  var nbNumbers = Math.floor(Math.log10(value)) + 1;
  if (nbNumbers <= 3) {
    return "".concat(value, " ").concat(unit);
  }
  if (nbNumbers <= 6) {
    return "".concat(value / 1000, " k").concat(unit);
  }
  if (nbNumbers <= 9) {
    return "".concat(value / 1000000, " M").concat(unit);
  }
  if (nbNumbers <= 12) {
    return "".concat(value / 1000000000, " G").concat(unit);
  }
  return "".concat(value / 1000000000000, " T").concat(unit);
}
//# sourceMappingURL=number_format.js.map