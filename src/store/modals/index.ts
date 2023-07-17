import { ModalData, ModalNames, ModalsModuleState } from '@src/store/modals/types';
import StoreModule from '../module';

class ModalsState extends StoreModule<ModalsModuleState> {

  initState(): ModalsModuleState {
    return {
      openedModals: [],
      lastModalId: 1,
    };
  }

  open<Result>({
                 name,
                 data,
               }: { name: ModalNames, data: Omit<ModalData, 'onClose'> }): Promise<Result | undefined> {
    return new Promise((res, _) => {
      const id = this.getState().lastModalId;
      this.setState({
        openedModals: [...this.getState().openedModals, {
          id,
          name,
          data: {
            ...data,
            onClose: (result) => {
              res(result as Result);
              this.close(id);
            },
          },
        }],
        lastModalId: id + 1,
      }, `Открытие модалки ${name}`);
    });
  }

  close(id: number) {
    this.setState({
      ...this.getState(),
      openedModals: this.getState().openedModals.filter(modal => modal.id !== id),
    }, `Закрытие модалки`);
  }
}

export default ModalsState;
