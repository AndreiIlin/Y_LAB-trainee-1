import { BasicApiResponse } from '@src/api/types';
import { RootState } from '@src/index';
import Services from '@src/services';
import { IArticle } from '@src/store-redux/article/types';
import { Dispatch } from 'redux';

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id: string) => {
    return async (dispatch: Dispatch, getState: () => RootState, services: Services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' });

      try {
        const res = await services.api.request<BasicApiResponse<IArticle>>({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        // Товар загружен успешно
        dispatch({ type: 'article/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article/load-error' });
      }
    };
  },
};
