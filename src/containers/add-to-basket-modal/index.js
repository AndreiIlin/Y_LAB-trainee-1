import { memo, useCallback, useState } from 'react';
import Field from '@src/components/field/index.js';
import Input from '@src/components/input/index.js';
import useTranslate from '@src/hooks/use-translate.js';
import ButtonsGroup from '@src/components/buttons-group/index.js';
import SideLayout from '@src/components/side-layout/index.js';

function AddToBasketModal({ modalData }) {
  const { t } = useTranslate();

  const [articles, setArticles] = useState(modalData.items.map(item => ({
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
    modalData.onClose(articles);
  };

  return (
    <SideLayout side={'start'} padding={'small'} direction={'column'}>
      {articles.map(item => (
        <Field key={item._id} label={`${modalData.labelFirst}${item.title}${modalData.labelLast}`}>
          <Input name={item._id} type={'number'} value={item.count} min={0} onChange={callbacks.inputHandle} />
        </Field>
      ))}
      <ButtonsGroup>
        <button onClick={handleConfirm}>{t('modals/addToBasket.confirm')}</button>
        <button onClick={modalData.onClose}>{t('modals/addToBasket.cancel')}</button>
      </ButtonsGroup>
    </SideLayout>
  );
}

export default memo(AddToBasketModal);
