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
  isModal,
  modalConfirmFn,
}) {

  const store = useStore();
  const { t } = useTranslate();

  const [selectedItems, setSelectedItems] = useState([]);

  const isSelectMode = !!selectedItems.length;

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
  }));

  const callbacks = {
    // Открытие модального окна добавления товаров
    addToBasketModalOpen: useCallback((items) => () => {
      store.actions.modals.open({
        name: 'add to basket',
        data: {
          title: t('modals/addToBasket.title'),
          labelFirst: t('modals/addToBasket.count.first'),
          labelLast: t('modals/addToBasket.count.last'),
          labelClose: t('modals/addToBasket.cancel'),
          items,
          onClose: () => store.actions.modals.close('add to basket'),
          onConfirm: isModal ? modalConfirmFn : (items) => {
            if (!items.length) {
              return;
            }
            store.actions.modals.close('add to basket');
            store.actions.basket.addToBasket(items);
            setSelectedItems([]);
          },
        },
      });
    }, [t, store, isModal]),
    // обработчик вызова функции из корзины
    handleModalConfirmFn: useCallback((items) => () => {
      modalConfirmFn(items);
    }, [modalConfirmFn]),
    // Пагинация
    onPaginate: useCallback(page => store.actions.catalog.setParams({ page }, false, isModal), [store]),
    // генератор ссылки для пагинатора
    makePaginatorLink: isModal ? () => {} : useCallback((page) => {
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
          isSelectMode={isSelectMode} isItemSelected={isItemSelected}
        />
      );
    }, [callbacks.addToBasketModalOpen, t, isSelectMode, selectedItems]),
  };

  return (
    <Spinner active={select.waiting}>
      {isSelectMode && <SideLayout side={'end'} padding={'medium'}>
        <button
          onClick={callbacks.addToBasketModalOpen(selectedItems)}
        >Добавить выделенные
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
  isModal: PropTypes.bool,
  modalConfirmFn: PropTypes.func,
};

CatalogList.defaultProps = {
  isModal: false,
  modalConfirmFn: () => {
  },
};

export default memo(CatalogList);
