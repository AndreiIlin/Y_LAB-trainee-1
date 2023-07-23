import BasketTool from '@src/components/basket-tool';
import Menu from '@src/components/menu/index.js';
import SideLayout from '@src/components/side-layout';
import { INavigationMenuOption } from '@src/containers/navigation/types';
import useSelector from '@src/hooks/use-selector';
import useStore from '@src/hooks/use-store';
import useTranslate from '@src/hooks/use-translate';
import { IBasketArticle } from '@src/store/basket/types';
import { memo, useCallback, useMemo } from 'react';

function Navigation() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // Функция для локализации текстов
  const { t } = useTranslate();

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(async () => {
      //store.actions.modals.open('basket')
      await store.actions.modals.open<IBasketArticle>({
        name: 'basket',
        data: {
          title: t('basket.title'),
          labelClose: t('basket.close'),
        },
      });

    }, [store]),

    // Обработка перехода на главную
    onNavigate: useCallback(async (item: INavigationMenuOption) => {
      if (item.key === 1) {
        await store.actions.catalog.resetParams();
        await store.actions.countries.resetState();
      }
    }, [store]),
  };

  const options = {
    menu: useMemo((): INavigationMenuOption[] => ([
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
