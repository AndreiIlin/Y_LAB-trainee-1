import CatalogFilter from '@src/containers/catalog-filter/index.js';
import CatalogList from '@src/containers/catalog-list/index.js';
import useInit from '@src/hooks/use-init';
import useStore from '@src/hooks/use-store.js';
import { ModalData } from '@src/store/modals/types';
import { memo, useEffect } from 'react';

interface CatalogModalProps {
  modalData: ModalData;
}

function CatalogModal({ modalData }: CatalogModalProps) {

  const store = useStore();

  useEffect(() => {
    store.makeState('catalog-modal', 'catalog', {
      saveParamsInUrl: false,
    });
    return () => store.removeState('catalog-modal');
  }, []);

  useInit(async () => {
    await Promise.all([
      store.actions['catalog-modal'].initParams(store.actions['catalog-modal'].initState().params),
      store.actions.categories.load(),
    ]);
  }, [], true);

  return (
    <>
      <CatalogFilter moduleName={'catalog-modal'} />
      <CatalogList moduleName={'catalog-modal'} modalData={modalData} />
    </>
  );
}

export default memo(CatalogModal);
