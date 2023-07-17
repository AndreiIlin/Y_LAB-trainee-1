import { ActionTypes } from '@src/store-redux/actionTypes';

export interface IArticle {
  _id: string;
  _key: string;
  name: string;
  title: string;
  description: string;
  price: number;
  madeIn: IMadeIn;
  edition: number;
  category: IArticleCategory;
  order: number;
  isNew: boolean;
  proto: IProto;
  _type: string;
  dateCreate: string;
  dateUpdate: string;
  isDeleted: boolean;
  isFavorite: boolean;
}
export interface IMadeIn {
  title: string;
  code?: string;
  _id: string;
  _type?: string;
}

export interface IArticleCategory {
  title?: string;
  _id: string;
  _type?: string;
}

export interface IProto {
}

export interface ArticleInitialState {
  data: IArticle;
  waiting: boolean;
}

export type ArticleLoadStart = {
  type: ActionTypes.articleLoadStart;
}

export type ArticleLoadSuccess = {
  type: ActionTypes.articleLoadSuccess;
  payload: {
    data: IArticle;
  };
}

export type ArticleLoadError = {
  type: ActionTypes.articleLoadError;
}

export type ArticleReducerActions = ArticleLoadStart | ArticleLoadSuccess | ArticleLoadError;
