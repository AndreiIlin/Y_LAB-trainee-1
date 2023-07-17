import Services from '@src/services';
import Store from '@src/store/index';
import { StoreActions, StoreModuleName } from '@src/store/types';

/**
 * Базовый класс для модулей хранилища
 * Для группировки действий над внешним состоянием
 */
class StoreModule<State, Config = {}> {
  private store: Store;
  private readonly name: keyof StoreActions;
  config: Config;
  protected services: Services;

  /**
   * @param store {Store}
   * @param name {String}
   * @param [config] {Object}
   */
  constructor(store: Store, name: keyof StoreActions, config: Config = {} as Config) {
    this.store = store;
    this.name = name;
    this.config = config;
    /** @type {Services} */
    this.services = store.services;
  }

  initState(): State {
    return {} as State;
  }

  getState(): State {
    return this.store.getState()[this.name] as State;
  }

  setState(newState: State, description = 'setState') {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState,
    }, description);
  }

}

export default StoreModule;
