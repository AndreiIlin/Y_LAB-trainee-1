import { IArticle } from '@src/store-redux/article/types';

export interface IParams {
  page: number;
  limit: number;
  sort: string;
  query: string;
  category: string;
  countries: string;
}

export interface CatalogModuleState {
  list: IArticle[],
  params: IParams;
  count: number;
  waiting: boolean;
}

export interface CatalogConfig {
  saveParamsInUrl?: boolean;
}
