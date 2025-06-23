
  /**
   * @param {number|string} value
   * @param {number} precision
   * @returns {number}
   */
  export function numberFormat(value: number|string, precision: number): number {
    const numberValue = typeof value === 'number' ? value : parseFloat(value);
    return parseFloat((numberValue).toPrecision(precision));
  }

  /**
   * @param {number} value
   * @param {string} unit
   * @returns {string}
   */
  export function units(value: number, unit: string): string {
    const nbNumbers = Math.floor(Math.log10(value)) + 1;

    if (nbNumbers <= 3) {
      return `${value} ${unit}`;
    }

    if (nbNumbers <= 6) {
      return `${value / 1000} k${unit}`;
    }

    if (nbNumbers <= 9) {
      return `${value / 1000000} M${unit}`;
    }

    if (nbNumbers <= 12) {
      return `${value / 1000000000} G${unit}`;
    }

    return `${value / 1000000000000} T${unit}`;
  }
