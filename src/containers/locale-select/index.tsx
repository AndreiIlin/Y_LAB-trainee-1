import Select from '@src/components/select';
import useTranslate from '@src/hooks/use-translate';
import { Lang } from '@src/i18n/types';
import { memo, useCallback, useMemo } from 'react';

function LocaleSelect() {

  const {
    lang,
    setLang,
  } = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {
        value: 'ru',
        title: 'Русский',
      },
      {
        value: 'en',
        title: 'English',
      },
    ]), []),
  };

  const callbacks = {
    onChange: useCallback((value: string) => {
      setLang(value as Lang);
    }, []),
  };

  return (
    <Select onChange={callbacks.onChange} value={lang} options={options.lang} />
  );
}

export default memo(LocaleSelect);
