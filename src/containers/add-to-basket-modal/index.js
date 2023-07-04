import { memo, useCallback, useState } from 'react';
import Field from '@src/components/field/index.js';
import Input from '@src/components/input/index.js';
import { useSelector } from 'react-redux';
import useTranslate from '@src/hooks/use-translate.js';
import ButtonsGroup from '@src/components/buttons-group/index.js';
import ModalContentLayout from '@src/components/modal-content-layout/index.js';

function AddToBasketModal() {
  const [count, setCount] = useState('0');
  const { t } = useTranslate();

  const select = useSelector(state => ({
    data: state.modals.data,
  }));

  const callbacks = {
    inputHandle: useCallback((event) => {
      setCount(event.target.value);
    }, []),
  };

  const handleConfirm = () => {
    select.data.onConfirm(select.data._id, +count);
  };

  return (
    <ModalContentLayout>
      <Field label={select.data.label}>
        <Input type={'number'} value={count} min={0} onChange={callbacks.inputHandle} />
        <ButtonsGroup>
          <button onClick={handleConfirm}>{t('modals/addToBasket.confirm')}</button>
          <button onClick={select.data.onClose}>{t('modals/addToBasket.cancel')}</button>
        </ButtonsGroup>
      </Field>
    </ModalContentLayout>
  );
}

export default memo(AddToBasketModal);
