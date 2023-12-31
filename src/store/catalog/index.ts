import { MultiDataApiResponseWithCount } from '@src/api/types';
import { IArticle } from '@src/store-redux/article/types';
import { CatalogConfig, CatalogModuleState, IParams } from '@src/store/catalog/types';
import exclude from '@src/utils/exclude';
import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule<CatalogModuleState, CatalogConfig> {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): CatalogModuleState {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: '',
        countries: '',
      },
      count: 0,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams: IParams = {} as IParams) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams: IParams = {} as IParams;
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort') as IParams['sort'];
    if (urlParams.has('query')) validParams.query = urlParams.get('query') as IParams['query'];
    if (urlParams.has('category')) validParams.category = urlParams.get('category') as IParams['category'];
    if (urlParams.has('countries')) validParams.countries = urlParams.get('countries') as IParams['countries'];
    await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams: IParams = {} as IParams) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams: Partial<IParams> = {} as IParams, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true,
    }, 'Установлены параметры каталога');

    if (this.config.saveParamsInUrl) {
      // Сохранить параметры в адрес страницы
      let urlSearch = new URLSearchParams(exclude(params, this.initState().params)).toString();
      const url = window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
      if (replaceHistory) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
    }

    const apiParams = exclude({
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
      'search[category]': params.category,
      'search[madeIn]': params.countries,
    }, {
      skip: 0,
      'search[query]': '',
      'search[category]': '',
      'search[madeIn]': '',
    });

    const res = await this.services.api.request<MultiDataApiResponseWithCount<IArticle>>({ url: `/api/v1/articles?${new URLSearchParams(apiParams)}` });
    this.setState({
      ...this.getState(),
      list: res.data.result.items,
      count: res.data.result.count,
      waiting: false,
    }, 'Загружен список товаров из АПИ');
  }
}

export default CatalogState;
