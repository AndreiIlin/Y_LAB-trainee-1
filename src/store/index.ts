import Services from '@src/services';
import {
  AllStoreActions,
  AllStoreStates,
  StoreActions,
  StoreConfig,
  StoreCustomActionName,
  StoreModuleName,
  StoreState,
} from '@src/store/types';
import * as modules from './exports.js';

/**
 * Хранилище состояния приложения
 */

class Store {
  services: Services;
  private config: StoreConfig;
  private listeners: CallableFunction[];
  private state: StoreState;
  actions: StoreActions;

  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services: Services, config: StoreConfig = {} as StoreConfig, initState: StoreState = {} as StoreState) {
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    this.state = initState;
    /** @type {{
     * basket: BasketState,
     * catalog: CatalogState,
     * modals: ModalsState,
     * article: ArticleState,
     * locale: LocaleState,
     * categories: CategoriesState,
     * session: SessionState,
     * profile: ProfileState
     * }} */
    this.actions = {} as StoreActions;
    const names = Object.keys(modules) as StoreModuleName[];
    for (const name of names) {
      this.actions[name] = new modules[name](this, name, this.config?.modules[name] || {}) as AllStoreActions;
      this.state[name] = this.actions[name].initState() as AllStoreStates;
    }
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener: CallableFunction) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Динамическое создание модуля хранилища
   * @param name {String} Кастомное имя модуля
   * @param moduleName {String} Имя модуля из импортируемого файла
   * @param config {Object} Конфигурация модуля
   * */

  makeState(name: StoreCustomActionName<StoreModuleName>, moduleName: StoreModuleName, config = {}) {
    if (!this.actions[name]) {
      // if (!moduleName) moduleName = name;
      if (!(modules)[moduleName]) throw new Error(`Not found store module "${moduleName}"`);
      config = {
        ...this.config.modules[moduleName] || {},
        ...config,
      };
      this.actions[name] = new modules[moduleName](this, name, config) as AllStoreActions;
      this.state[name] = this.actions[name].initState() as AllStoreStates;
    }
  }

  /**
   * Удаление модуля хранилища
   * @param name {String} Кастомное имя модуля
   * */
  removeState(name: StoreCustomActionName<StoreModuleName>) {
    delete this.state[name];
    delete this.actions[name];
  }

  /**
   * Выбор состояния
   * @returns {{
   * basket: Object,
   * catalog: Object,
   * modals: Object,
   * article: Object,
   * locale: Object,
   * categories: Object,
   * session: Object,
   * profile: Object,
   * }}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   * @param description {String}
   */
  setState(newState: StoreState, description = 'setState') {
    if (this.config.log) {
      console.group(
        `%c${'store.setState'} %c${description}`,
        `color: ${'#777'}; font-weight: normal`,
        `color: ${'#333'}; font-weight: bold`,
      );
      console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
      console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
      console.groupEnd();
    }
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }
}

export default Store;
