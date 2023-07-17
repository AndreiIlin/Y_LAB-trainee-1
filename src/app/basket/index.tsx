import BasketTotal from '@src/components/basket-total';
import ItemBasket from '@src/components/item-basket';
import List from '@src/components/list';
import SideLayout from '@src/components/side-layout';
import useSelector from '@src/hooks/use-selector';
import useStore from '@src/hooks/use-store';
import useTranslate from '@src/hooks/use-translate';
import { AddToBasketArticle, IBasketArticle } from '@src/store/basket/types';
import { ModalData } from '@src/store/modals/types';
import React, { memo, useCallback } from 'react';

interface BasketProps {
  modalData: ModalData;
}

function Basket({ modalData }: BasketProps) {
  const store = useStore();

  const { t } = useTranslate();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback((_id: string) => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие модалки корзины
    closeModal: useCallback(() => {
      modalData.onClose();
    }, [modalData]),
    // Открытие модалки каталога
    openCatalogModal: useCallback(async () => {
      const result = await store.actions.modals.open<AddToBasketArticle[]>({
        name: 'catalog',
        data: {
          title: t('title'),
          labelClose: t('basket.close'),
        },
      });

      if (!result || !result.length) {
        return;
      }

      await store.actions.basket.addToBasket(result);
    }, [t]),
  };

  const renders = {
    itemBasket: useCallback((item: IBasketArticle): React.ReactNode => (
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
      <List<IBasketArticle>
        list={select.list}
        renderItem={renders.itemBasket}
      />
      <BasketTotal sum={select.sum} t={t} />
      <SideLayout side={'start'} padding={'small'}>
        <button onClick={callbacks.openCatalogModal}>{t('basket.addMore')}</button>
      </SideLayout>
    </>
  );
}

export default memo(Basket);
