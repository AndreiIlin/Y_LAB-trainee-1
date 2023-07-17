import { Lang, Text, Texts } from '@src/i18n/types';
import * as translations from './translations';

/**
 * Перевод фразу по словарю
 * @param lang {String} Код языка
 * @param text {String} Текст для перевода
 * @param [plural] {Number} Число для плюрализации
 * @returns {String} Переведенный текст
 */

export default function translate(lang: Lang, text: Text, plural?: number): string {
  let result: string | Texts = translations[lang] && (text in translations[lang])
    ? translations[lang][text]
    : text;

  if (typeof plural !== 'undefined' && typeof result === 'object') {
    const key = new Intl.PluralRules(lang).select(plural);
    if (key in result) {
      result = result[key as keyof Texts];
    }
  }

  return result as string;
}

