import { IConfig } from '@src/types';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
const config: IConfig = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена в АПИ
        tokenHeader: 'X-Token',
      },
      catalog: {
        saveParamsInUrl: true,
      },
    },
  },
  api: {
    baseUrl: '',
  },
};

export default config;
