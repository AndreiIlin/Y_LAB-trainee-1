export default {
  /**
   * Открытие модалки по названию
   * @param name
   * @param data
   */
  open: ({ name, data }) => {
    return {type: 'modal/open', payload: {name, data}};
  },

  /**
   * Закрытие модалки
   * @param name
   */
  close: () => {
    return {type: 'modal/close'}
  }
}
