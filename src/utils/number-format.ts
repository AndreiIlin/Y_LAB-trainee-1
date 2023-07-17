/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export default function numberFormat(value: number, locale: string = 'ru-RU', options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}
