import { memo, useCallback, useState } from 'react';
import useStore from '@src/hooks/use-store';
import useSelector from '@src/hooks/use-selector';
import useTranslate from '@src/hooks/use-translate';
import Item from '@src/components/item';
import List from '@src/components/list';
import Pagination from '@src/components/pagination';
import Spinner from '@src/components/spinner';
import SideLayout from '@src/components/side-layout/index.js';
import PropTypes from 'prop-types';

function CatalogList({
  moduleName,
  modalData,
}) {
  const store = useStore();

  const { t } = useTranslate();

  const [selectedItems, setSelectedItems] = useState([]);

  const isSelectMode = !!selectedItems.length;

  const select = useSelector(state => ({
    list: state[moduleName]?.list || [],
    page: state[moduleName]?.params.page || 1,
    limit: state[moduleName]?.params.limit || 10,
    count: state[moduleName]?.count || 0,
    waiting: state[moduleName]?.waiting || false,
  }));

  const callbacks = {
    // Открытие модального окна добавления товаров?
    addToBasketModalOpen: useCallback((items) => async () => {
      const result = await store.actions.modals.open({
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
    onPaginate: useCallback(page => store.actions[moduleName].setParams({ page }), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: useCallback((page) => {
      return `?${new URLSearchParams({
        page,
        limit: select.limit,
        sort: select.sort,
        query: select.query,
      })}`;
    }, [select.limit, select.sort, select.query]),
    handleSelectItem: useCallback((_id, title) => () => {
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
    addSelectedItems: useCallback((items) => async () => {
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
    item: useCallback(item => {
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
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        count={select.count} page={select.page} limit={select.limit}
        onChange={callbacks.onPaginate} makeLink={callbacks.makePaginatorLink}
      />
    </Spinner>
  );
}

CatalogList.propTypes = {
  moduleName: PropTypes.string,
};

CatalogList.defaultProps = {
  moduleName: 'catalog',
};

export default memo(CatalogList);
