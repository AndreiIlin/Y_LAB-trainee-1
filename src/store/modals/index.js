import StoreModule from '../module';

class ModalsState extends StoreModule {

  initState() {
    return {
      openedModals: [],
    };
  }

  open({
    name,
    data,
  }) {
    this.setState({
      openedModals: [...this.getState().openedModals, {
        name,
        data,
      }],
    }, `Открытие модалки ${name}`);
  }

  close(name) {
    this.setState({
      openedModals: this.getState().openedModals.filter(modal => modal.name !== name),
    }, `Закрытие модалки ${name}`);
  }

  closeAll() {
    this.setState({
      openedModals: [],
    }, 'Закрытие всех модалок');
  }
}

export default ModalsState;
