import { memo, useCallback, useMemo } from 'react';
import useStore from '@src/hooks/use-store';
import useSelector from '@src/hooks/use-selector';
import useTranslate from '@src/hooks/use-translate';
import Menu from '@src/components/menu';
import BasketTool from '@src/components/basket-tool';
import SideLayout from '@src/components/side-layout';
import { useDispatch } from 'react-redux';
import modalsActions from '@src/store-redux/modals/actions';

function Navigation() {
  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
  }));

  // Функция для локализации текстов
  const { t } = useTranslate();

  const callbacks = {
    // Закрытие модалки корзины
    closeModal: useCallback(() => {
      //store.actions.modals.close();
      dispatch(modalsActions.close());
    }, []),

    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      //store.actions.modals.open('basket')
      dispatch(modalsActions.open({
        name: 'basket',
        data: {
          title: t('basket.title'),
          labelClose: t('basket.close'),
          onClose: callbacks.closeModal,
        },
      }));

    }, []),

    // Обработка перехода на главную
    onNavigate: useCallback((item) => {
      if (item.key === 1) store.actions.catalog.resetParams();
    }, [store]),
  };

  const options = {
    menu: useMemo(() => ([
      {
        key: 1,
        title: t('menu.main'),
        link: '/',
      },
    ]), [t]),
  };

  return (
    <SideLayout side="between">
      <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} t={t} />
    </SideLayout>
  );
}

export default memo(Navigation);
