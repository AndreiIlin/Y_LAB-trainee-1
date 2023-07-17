import { MultiDataApiResponse } from '@src/api/types';
import { CategoriesModuleState, ICategory } from '@src/store/categories/types';
import StoreModule from '../module';

/**
 * Список категорий
 */
class CategoriesState extends StoreModule<CategoriesModuleState> {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): CategoriesModuleState {
    return {
      list: [],
      waiting: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load() {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание загрузки категорий');

    const res = await this.services.api.request<MultiDataApiResponse<ICategory>>({
      url: `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`,
    });

    // Товар загружен успешно
    this.setState({
      ...this.getState(),
      list: res.data.result.items,
      waiting: false,
    }, 'Категории загружены');
  }
}

export default CategoriesState;
