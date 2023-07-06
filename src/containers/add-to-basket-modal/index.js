import { memo, useCallback, useState } from 'react';
import Field from '@src/components/field/index.js';
import Input from '@src/components/input/index.js';
import useTranslate from '@src/hooks/use-translate.js';
import ButtonsGroup from '@src/components/buttons-group/index.js';
import useSelector from '@src/hooks/use-selector.js';
import SideLayout from '@src/components/side-layout/index.js';

function AddToBasketModal() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    openedModals: state.modals.openedModals,
  }));

  const currentModalData = select.openedModals.at(-1).data;

  const [articles, setArticles] = useState(currentModalData.items.map(item => ({
    ...item,
    count: '0',
  })));

  const callbacks = {
    inputHandle: useCallback((event) => {
      setArticles(prev => {
        return prev.map(item => {
          if (item._id !== event.target.name) return item;
          return {
            ...item,
            count: event.target.value,
          };
        });
      });
    }, []),
  };

  const handleConfirm = () => {
    currentModalData.onConfirm(articles);
  };

  return (
    <SideLayout side={'start'} padding={'small'} direction={'column'}>
      {currentModalData.items.map(item => {
        const currItem = articles.find(article => article._id === item._id);
        return (
          <Field key={item._id} label={`${currentModalData.labelFirst}${item.title}${currentModalData.labelLast}`}>
            <Input name={item._id} type={'number'} value={currItem.count} min={0} onChange={callbacks.inputHandle} />
          </Field>
        );
      })}
      <ButtonsGroup>
        <button onClick={handleConfirm}>{t('modals/addToBasket.confirm')}</button>
        <button onClick={currentModalData.onClose}>{t('modals/addToBasket.cancel')}</button>
      </ButtonsGroup>
    </SideLayout>
  );
}

export default memo(AddToBasketModal);
