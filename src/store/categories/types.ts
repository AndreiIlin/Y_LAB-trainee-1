interface ICategoryParent {
  _id: string;
}

export interface ICategory {
  _id: string;
  title: string;
  parent: ICategoryParent | null;
}

export interface ICategoryWithChildren extends ICategory {
  children: ICategoryWithChildren[];
}

export interface CategoriesModuleState {
  list: ICategory[] | ICategoryWithChildren[];
  waiting: boolean;
}
