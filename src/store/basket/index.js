import StoreModule from '../module';

/**
 * Покупательская корзина
 */
class BasketState extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param articles {Array} Массив товаров
   */
  async addToBasket(articles) {
    const ids = articles.map(article => article._id).join('|');
    const res = await this.services.api.request({ url: `/api/v1/articles?search[ids]=${ids}` });
    const items = res.data.result.items;
    const newList = [...this.getState().list];
    let sum = this.getState().sum;

    articles.forEach(article => {
      const currArticleInState = newList.find(art => art._id === article._id);
      const currArticleInResponse = items.find(item => item._id === article._id);

      if (!currArticleInState) {
        const newArticle = {
          ...currArticleInResponse,
          amount: +article.count,
        };
        newList.push(newArticle);
        sum += +article.count * currArticleInResponse.price;
        return;
      }

      currArticleInState.amount += +article.count;
      sum += article.count * currArticleInState.price;
    });

    this.setState({
      ...this.getState(),
      list: newList,
      sum,
      amount: newList.length,
    }, 'Добавление в корзину');
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length,
    }, 'Удаление из корзины');
  }
}

export default BasketState;
