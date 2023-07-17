import { IArticle } from '@src/store-redux/article/types';

export interface IBasketArticle extends IArticle {
  amount: number;
}

export interface BasketModuleState {
  list: IBasketArticle[];
  sum: number;
  amount: number;
}

export interface AddToBasketArticle {
  _id: string;
  title: string;
  count: number;
}
