import useSelector from '@src/hooks/use-selector';
import Modal from '@src/components/modal/index.js';
import AddToBasketModal from '@src/containers/add-to-basket-modal/index.js';
import Basket from '@src/app/basket/index.js';
import CatalogModal from '@src/containers/catalog-modal/index.js';
import { memo } from 'react';

export const existingModals = {
  'add to basket': AddToBasketModal,
  basket: Basket,
  catalog: CatalogModal,
};

function Modals() {

  const select = useSelector(state => ({
    modals: state.modals.openedModals,
  }));

  if (!select.modals.length) return null;

  return select.modals.map((modal, index) => {
    const OpenedModal = existingModals[modal.name];
    return (
      <Modal
        key={index} onClose={modal.data.onClose} title={modal.data.title}
        labelClose={modal.data.labelClose}
      >
        <OpenedModal modalData={modal.data} />
      </Modal>
    );
  });
}

export default memo(Modals);
