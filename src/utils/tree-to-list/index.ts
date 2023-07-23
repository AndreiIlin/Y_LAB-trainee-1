// /**
//  * Преобразование списка в иерархию.
//  * @param tree {Array} Иерархия - список узлов со свойством children.
//  * @param [callback] {Function} Для пользовательского преобразования элемента.
//  * @param [level] {Number} Начальный уровень вложенности.
//  * @param [result] {Array} Результат функции (используется рекурсией).
//  * @returns {Array} Корневые узлы
//  */

type ResultType<Initial, Changed> = Changed extends null ? Initial : Changed;

export default function treeToList<
  Initial extends { children: Initial[] },
  Changed = null
>(
  tree: Initial[],
  callback?: (item: Initial, level: number) => Changed,
  level = 0,
  prevResult: ResultType<Initial, Changed>[] = []
): ResultType<Initial, Changed>[] {
  const result: ResultType<Initial, Changed>[] = prevResult;
  for (const item of tree) {
    const currentItem = callback ? callback(item, level) : (item as any);
    result.push(currentItem as ResultType<Initial, Changed>);
    if (item.children?.length) {
      treeToList(item.children, callback, level + 1, result);
    }
  }
  return result;
}




