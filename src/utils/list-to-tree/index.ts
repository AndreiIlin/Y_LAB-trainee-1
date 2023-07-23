// /**
//  * Преобразование списка в иерархию
//  * @param list {Array} Список объектов с отношением на родителя
//  * @param [key] {String} Свойство с первичным ключом
//  * @returns {Array} Корневые узлы
//  */

interface IParent {
  parent: {
    _id: string;
  } | null;
}

interface IChild<T> {
  children: T[];
}

export default function listToTree<
  Initial extends IParent,
  Result extends IChild<Result>,
  K extends keyof Initial & string // Ensure K is a string key of Initial
>(list: Initial[], key: K): Result[] {
  const trees: Record<string, Result> = {};
  const roots: Record<string, Result> = {};

  for (const item of list) {
    const itemKey = item[key] as string;
    if (!trees[itemKey]) {
      trees[itemKey] = item as unknown as Result;
      trees[itemKey].children = [];
      roots[itemKey] = trees[itemKey];
    } else {
      trees[itemKey] = Object.assign(trees[itemKey], item);
    }

    if (item.parent?._id) {
      const parentKey = item.parent._id as string;
      if (!trees[parentKey]) {
        trees[parentKey] = { children: [] } as unknown as Result;
      }
      trees[parentKey].children.push(trees[itemKey]);
      if (roots[itemKey]) {
        delete roots[itemKey];
      }
    }
  }

  return Object.values(roots);
}


