export interface ICountry {
  _id: string;
  title: string;
  code: string;
}

export interface CountriesModuleState {
  list: ICountry[];
  waiting: boolean;
  selectedCountries: ICountry[];
  lastSearchQuery: string;
}
