import ButtonsGroup from '@src/components/buttons-group';
import Field from '@src/components/field';
import Input from '@src/components/input';
import SideLayout from '@src/components/side-layout';
import useTranslate from '@src/hooks/use-translate';
import { ModalData } from '@src/store/modals/types';
import React, { memo, useCallback, useState } from 'react';

interface AddToBasketModalProps {
  modalData: ModalData;
}

function AddToBasketModal({ modalData }: AddToBasketModalProps) {
  const { t } = useTranslate();

  const [articles, setArticles] = useState(modalData.items ? modalData.items.map(item => ({
    ...item,
    count: '0',
  })) : []);

  const callbacks = {
    inputHandle: useCallback((value: string, name: string) => {
      setArticles(prev => {
        return prev.map(item => {
          if (item._id !== name) return item;
          return {
            ...item,
            count: value,
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
