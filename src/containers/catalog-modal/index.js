import CatalogFilter from '@src/containers/catalog-filter/index.js';
import CatalogList from '@src/containers/catalog-list/index.js';
import { memo } from 'react';
import useSelector from '@src/hooks/use-selector.js';
import useInit from '@src/hooks/use-init.js';
import useStore from '@src/hooks/use-store.js';

function CatalogModal() {

  const store = useStore();

  useInit(async () => {
    await Promise.all([
      store.actions.catalog.initParams(store.actions.catalog.initState().params, true),
      store.actions.categories.load(),
    ]);
  }, [], true);

  const select = useSelector(state => ({
    modals: state.modals.openedModals,
  }));

  const catalogModal = select.modals.find(modal => modal.name === 'catalog');

  return (
    <>
      <CatalogFilter isModal={true} />
      <CatalogList isModal={true} modalConfirmFn={catalogModal.data.onConfirm} />
    </>
  );
}

export default memo(CatalogModal);
