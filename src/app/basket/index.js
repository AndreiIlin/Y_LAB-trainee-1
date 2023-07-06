import { memo, useCallback } from 'react';
import useStore from '@src/hooks/use-store';
import useSelector from '@src/hooks/use-selector';
import useTranslate from '@src/hooks/use-translate';
import ItemBasket from '@src/components/item-basket';
import List from '@src/components/list';
import BasketTotal from '@src/components/basket-total';
import SideLayout from '@src/components/side-layout/index.js';

function Basket() {

  const store = useStore();

  const { t } = useTranslate();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие модалки корзины
    closeModal: useCallback(() => {
      store.actions.modals.close('basket');
    }, [store]),
    // Открытие модалки каталога
    openCatalogModal: useCallback(() => {
      store.actions.modals.open({
        name: 'catalog',
        data: {
          title: t('title'),
          labelClose: t('basket.close'),
          onClose: () => store.actions.modals.close('catalog'),
          onConfirm: (items) => {
            if (!items.length) {
              return;
            }
            store.actions.modals.close('add to basket');
            store.actions.modals.close('catalog');
            store.actions.basket.addToBasket(items)
          },
        }
      })
    }, [t]),
  };

  const renders = {
    itemBasket: useCallback((item) => (
      <ItemBasket
        item={item}
        amount={item.amount}
        link={`/articles/${item._id}`}
        onRemove={callbacks.removeFromBasket}
        onLink={callbacks.closeModal}
        labelUnit={t('basket.unit')}
        labelDelete={t('basket.delete')}
      />
    ), [callbacks.removeFromBasket, t]),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} t={t} />
      <SideLayout side={'start'} padding={'small'}>
        <button onClick={callbacks.openCatalogModal}>{t('basket.addMore')}</button>
      </SideLayout>
    </>
  );
}

export default memo(Basket);
