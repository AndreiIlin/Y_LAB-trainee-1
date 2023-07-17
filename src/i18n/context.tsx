import { Lang, Text } from '@src/i18n/types';
import { createContext, ReactNode, useMemo, useState } from 'react';
import translate from './translate';

/**
 * @type {React.Context<{}>}
 */

interface I18nContext {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: Text, number?: number) => string;
}
export const I18nContext = createContext<I18nContext>({} as I18nContext);

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {

  const [lang, setLang] = useState<Lang>('ru');

  const i18n = useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang,
    // Функция для локализации текстов с замыканием на код языка
    t: (text: Text, number?: number): string => translate(lang, text, number),
  }), [lang]);

  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}
