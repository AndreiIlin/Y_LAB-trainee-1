import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '@src/hooks/use-store';
import useSelector from '@src/hooks/use-selector';
import useTranslate from '@src/hooks/use-translate';
import ItemBasket from '@src/components/item-basket';
import List from '@src/components/list';
import BasketTotal from '@src/components/basket-total';
import modalsActions from '@src/store-redux/modals/actions';

function Basket() {

  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      //store.actions.modals.close();
      dispatch(modalsActions.close());
    }, [store]),
  };

  const { t } = useTranslate();

  const renders = {
    itemBasket: useCallback((item) => (
      <ItemBasket
        item={item}
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
    </>
  );
}

export default memo(Basket);
