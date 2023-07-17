import { ArticleInitialState, ArticleReducerActions, IArticle } from '@src/store-redux/article/types';
import { ActionTypes } from '../actionTypes';

export const initialState: ArticleInitialState = {
  data: {} as IArticle,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state: ArticleInitialState = initialState, action: ArticleReducerActions) {
  switch (action.type) {
    case ActionTypes.articleLoadStart:
      return { ...state, waiting: true };

    case ActionTypes.articleLoadSuccess:
      return { ...state, data: action.payload.data, waiting: false };

    case ActionTypes.articleLoadError:
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
