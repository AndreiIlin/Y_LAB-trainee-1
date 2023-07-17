import Item from '@src/components/item';
import List from '@src/components/list';
import Pagination from '@src/components/pagination';
import SideLayout from '@src/components/side-layout';
import Spinner from '@src/components/spinner';
import { SelectedItem } from '@src/containers/catalog-list/types';
import useSelector from '@src/hooks/use-selector';
import useStore from '@src/hooks/use-store';
import useTranslate from '@src/hooks/use-translate';
import { IArticle } from '@src/store-redux/article/types';
import { AddToBasketArticle } from '@src/store/basket/types';
import { ModalData, ModalItems } from '@src/store/modals/types';
import { StoreCustomActionName } from '@src/store/types';
import { memo, ReactNode, useCallback, useState } from 'react';

interface CatalogListProps {
  moduleName?: StoreCustomActionName<'catalog'>;
  modalData?: ModalData;
}

function CatalogList({
                       moduleName = 'catalog',
                       modalData,
                     }: CatalogListProps) {
  const store = useStore();

  const { t } = useTranslate();

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const isSelectMode = !!selectedItems.length;

  const select = useSelector(state => ({
    list: state[moduleName]?.list || [],
    page: state[moduleName]?.params.page || 1,
    limit: state[moduleName]?.params.limit || 10,
    count: state[moduleName]?.count || 0,
    waiting: state[moduleName]?.waiting || false,
    sort: state[moduleName]?.params.sort || 'order',
    query: state[moduleName]?.params.query || '',
  }));

  const callbacks = {
    // Открытие модального окна добавления товаров?
    addToBasketModalOpen: useCallback((items: ModalItems[]) => async () => {
      const result = await store.actions.modals.open<AddToBasketArticle[]>({
        name: 'add to basket',
        data: {
          title: t('modals/addToBasket.title'),
          labelFirst: t('modals/addToBasket.count.first'),
          labelLast: t('modals/addToBasket.count.last'),
          labelClose: t('modals/addToBasket.cancel'),
          items,
        },
      });
      if (!result || !result.length) {
        return;
      }
      await store.actions.basket.addToBasket(result);
      setSelectedItems([]);
    }, [t, store]),
    // Пагинация
    onPaginate: useCallback((page: number) => store.actions[moduleName].setParams({ page }), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback((page: number) => {
      return `?${new URLSearchParams({
        page: String(page),
        limit: select.limit.toString(),
        sort: select.sort,
        query: select.query,
      })}`;
    }, [select.limit, select.sort, select.query]),
    handleSelectItem: useCallback((_id: string, title: string) => () => {
      setSelectedItems(prev => {
        if (!prev.find(item => item._id === _id)) {
          return [...prev, {
            _id,
            title,
          }];
        }
        return prev.filter(item => item._id !== _id);
      });
    }, []),
    addSelectedItems: useCallback((items: SelectedItem[]) => async () => {
      const articles = items.map(item => ({
        ...item,
        count: 1,
      }));

      if (modalData) {
        modalData.onClose(articles);
      } else {
        await store.actions.basket.addToBasket(articles);
      }

      setSelectedItems([]);
    }, [modalData]),
  };

  const renders = {
    item: useCallback((item: IArticle): ReactNode => {
      const isItemSelected = !!selectedItems.find(it => it._id === item._id);
      return (
        <Item
          item={item} onAdd={callbacks.addToBasketModalOpen([{
          _id: item._id,
          title: item.title,
        }])} link={`/articles/${item._id}`}
          labelAdd={t('article.add')} selectItem={callbacks.handleSelectItem(item._id, item.title)}
          isSelectMode={isSelectMode || !!modalData} isItemSelected={isItemSelected}
        />
      );
    }, [callbacks.addToBasketModalOpen, t, isSelectMode, selectedItems]),
  };

  return (
    <Spinner active={select.waiting}>
      {isSelectMode && <SideLayout side={'end'} padding={'medium'}>
        <button
          onClick={callbacks.addSelectedItems(selectedItems)}
        >{t('article.selected')}
        </button>
      </SideLayout>}
      <List<IArticle> list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count} page={select.page} limit={select.limit}
        onChange={callbacks.onPaginate} makeLink={callbacks.makePaginatorLink}
      />
    </Spinner>
  );
}

CatalogList.defaultProps = {
  moduleName: 'catalog',
};

export default memo(CatalogList);
