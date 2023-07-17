import { IConfig } from '@src/types';
import APIService from './api';
import Store from './store';
import createStoreRedux from './store-redux';

class Services {
  private config: IConfig;
  private _api: APIService | undefined;
  private _store: Store | undefined;
  private _redux: ReturnType<typeof createStoreRedux>  | undefined;

  constructor(config: IConfig) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
}

export default Services;
