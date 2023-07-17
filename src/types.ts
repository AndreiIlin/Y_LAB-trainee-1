import { ApiConfig } from '@src/api/types';
import { ReduxConfig } from '@src/store-redux/types';
import { StoreConfig } from '@src/store/types';

export interface IConfig {
  store?: StoreConfig;
  api?: ApiConfig;
  redux?: ReduxConfig;
}
