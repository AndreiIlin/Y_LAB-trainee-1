import StoreModule from '../module';

class ModalsState extends StoreModule {

  initState() {
    return {
      openedModals: [],
      lastModalId: 1,
    };
  }

  open({
    name,
    data,
  }) {
    return new Promise((res, rej) => {
      const id = this.getState().lastModalId;
      this.setState({
        openedModals: [...this.getState().openedModals, {
          id,
          name,
          data: {
            ...data,
            onClose: (result) => {
              res(result);
              this.close(id);
            },
          },
        }],
        lastModalId: id + 1,
      }, `Открытие модалки ${name}`);
    });
  }

  close(id) {
    this.setState({
      ...this.getState(),
      openedModals: this.getState().openedModals.filter(modal => modal.id !== id),
    }, `Закрытие модалки`);
  }
}

export default ModalsState;
