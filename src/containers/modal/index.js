import ModalLayout from '@src/components/modal-layout';
import Basket from '@src/app/basket/index.js';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import AddToBasketModal from '@src/containers/add-to-basket-modal';

const modals = {
  'add to basket': AddToBasketModal,
  basket: Basket,
};

function Modal() {
  const select = useSelector((state) => ({
    modal: state.modals.name,
    data: state.modals.data,
  }));

  const OpenedModal = modals[select.modal];

  if (!OpenedModal) {
    return null;
  }

  return (
    <ModalLayout title={select.data.title} labelClose={select.data.labelClose} onClose={select.data.onClose}>
      <OpenedModal />
    </ModalLayout>
  );
}

export default memo(Modal);
