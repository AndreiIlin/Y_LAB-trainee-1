import React, { useEffect } from 'react';

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении depends.
 * @param initFunc {Function} Пользовательская функция
 * @param depends {Array} Значения при смене которых callback снова исполнится.
 * @param backForward {{backForward}}
 */
export default function useInit(initFunc: Function, depends: React.DependencyList = [], backForward = false) {
  useEffect(() => {
    initFunc(false);
    // Если в истории браузера меняются только search-параметры, то react-router не оповестит
    // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
    // браузера (если нужно отреагировать на изменения search-параметров при переходе по истории)
    if (backForward) {
      // @ts-ignore //TODO Убрать TS Ignore
      window.addEventListener('popstate', initFunc);
      return () => {
        // @ts-ignore //TODO Убрать TS Ignore
        window.removeEventListener('popstate', initFunc);
      };
    }
  }, depends);
}
