import Input from '@src/components/input';
import Select from '@src/components/select';
import SideLayout from '@src/components/side-layout';
import { IFilterOption } from '@src/containers/catalog-filter/types';
import CountriesSelect from '@src/containers/countries-select';
import useSelector from '@src/hooks/use-selector';
import useStore from '@src/hooks/use-store';
import useTranslate from '@src/hooks/use-translate';
import { ICategoryWithChildren } from '@src/store/categories/types';
import { StoreCustomActionName } from '@src/store/types';
import listToTree from '@src/utils/list-to-tree';
import treeToList from '@src/utils/tree-to-list';
import { memo, useCallback, useMemo } from 'react';

interface CatalogFilterProps {
  moduleName?: StoreCustomActionName<'catalog'>;
}

function CatalogFilter({ moduleName = 'catalog' }: CatalogFilterProps) {

  const store = useStore();


  const select = useSelector(state => ({
    sort: state[moduleName]?.params.sort || 'order',
    query: state[moduleName]?.params.query || '',
    category: state[moduleName]?.params.category || '',
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort: string) => store.actions[moduleName].setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback((query: string) => store.actions[moduleName].setParams({
      query,
      page: 1,
    }), [store]),
    // Сброс
    onReset: useCallback(async () => {
      await store.actions[moduleName].resetParams();
      await store.actions.countries.resetState();
    }, [store]),
    // Фильтр по категории
    onCategory: useCallback((category: string) => store.actions[moduleName].setParams({
      category,
      page: 1,
    }), [store]),
  };

  const options = {
    sort: useMemo((): IFilterOption[] => ([
      {
        value: 'order',
        title: 'По порядку',
      },
      {
        value: 'title.ru',
        title: 'По именованию',
      },
      {
        value: '-price',
        title: 'Сначала дорогие',
      },
      {
        value: 'edition',
        title: 'Древние',
      },
    ]), []),
    categories: useMemo((): IFilterOption[] => ([
      {
        value: '',
        title: 'Все',
      },
      ...treeToList<ICategoryWithChildren, IFilterOption>(listToTree(select.categories, '_id'), (item, level) => (
        {
          value: item._id,
          title: '- '.repeat(level) + item.title,
        }
      )),
    ]), [select.categories]),
  };
  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <CountriesSelect moduleName={moduleName} />
      <Input
        value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
        delay={1000} name={'filter-input'}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
