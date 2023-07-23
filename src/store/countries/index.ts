import { MultiDataApiResponse } from '@src/api/types';
import { CountriesModuleState, ICountry } from '@src/store/countries/types';
import StoreModule from '@src/store/module';

const defaultCountry: ICountry = {
  _id: '',
  code: '',
  title: 'Все',
};

/**
 * Список стран
 */
class CountriesState extends StoreModule<CountriesModuleState> {
  initState(): CountriesModuleState {
    return {
      list: [],
      selectedCountries: [defaultCountry],
      waiting: false,
      lastSearchQuery: '',
    };
  }

  async resetState() {
    this.setState(this.initState());
  }

  async initParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('countries')) return;
    const countries = urlParams.get('countries');

    const res = await this.services.api.request<MultiDataApiResponse<ICountry>>({
      url: `api/v1/countries?fields=_id,title,code&search[ids]=${countries}`,
    });

    this.setState({ ...this.getState(), selectedCountries: res.data.result.items });
  }

  async load(skip: number, searchQuery: string, limit: number = 10) {
    this.setState({ ...this.getState(), waiting: true }, 'Ожидание загрузки стран');
    const res = await this.services.api.request<MultiDataApiResponse<ICountry>>({
      url: `api/v1/countries?fields=_id,title,code&limit=${limit}&skip=${skip}&search[query]=${searchQuery}`,
    });

    if (searchQuery !== this.getState().lastSearchQuery) {
      this.setState({
        ...this.getState(), list: [],
      });
    }

    if (!res.data.result.items.length) {
      this.setState({ ...this.getState(), waiting: false });
      return false;
    }

    const oldStateList = this.getState().list;
    if (!oldStateList.find(country => country._id === defaultCountry._id) && !searchQuery) {
      oldStateList.unshift(defaultCountry);
    }
    const newStateList = res.data.result.items.filter(country => !this.getState().list.find(c => c._id === country._id));

    this.setState({
      ...this.getState(),
      list: [...this.getState().list, ...newStateList],
      waiting: false,
      lastSearchQuery: searchQuery,
    }, 'Загружен список стран из АПИ');

    return true;
  }

  async selectCountry(country: ICountry) {
    const isCountrySelected = this.getState().selectedCountries.some(c => c._id === country._id);

    if (!isCountrySelected) {
      const newSelectedCountries = [...this.getState().selectedCountries.filter(c => c._id !== defaultCountry._id), country];
      this.setState({
        ...this.getState(),
        selectedCountries: newSelectedCountries,
      }, `Изменен список выбранных стран`);

      return newSelectedCountries;
    }

    const newSelectedCountries = this.getState().selectedCountries.filter(c => c._id !== country._id);

    if (!newSelectedCountries.length) {
      newSelectedCountries.push(defaultCountry);
    }

    this.setState({ ...this.getState(), selectedCountries: newSelectedCountries }, `Изменен список выбранных стран`);

    return newSelectedCountries;
  }
}

export default CountriesState;
