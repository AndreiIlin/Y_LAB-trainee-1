import CustomSelect from '@src/components/custom-select';
import useSelector from '@src/hooks/use-selector';
import useStore from '@src/hooks/use-store';
import { ICountry } from '@src/store/countries/types';
import { StoreCustomActionName } from '@src/store/types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CountriesSelectProps {
  moduleName?: StoreCustomActionName<'catalog'>;
}

function CountriesSelect({ moduleName = 'catalog' }: CountriesSelectProps) {
  const store = useStore();

  const [opened, setOpened] = useState(false);
  const [skip, setSkip] = useState(0);
  const [activeOptionIndex, setActionOptionIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');

  const listRef = useRef<HTMLDivElement>(null);

  const select = useSelector(state => ({
    countries: state.countries.list,
    selectedCountries: state.countries.selectedCountries,
    loading: state.countries.waiting,
  }));

  const callbacks = {
    toggleSelect: useCallback(() => {
      setOpened(opened => !opened);
    }, []),
    closeSelect: useCallback(() => {
      setOpened(false);
    }, []),
    selectOption: useCallback((country: ICountry) => (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      event.stopPropagation();
      store.actions.countries.selectCountry(country)
        .then((newSelectedCountries) => {
          const newCountriesParam = newSelectedCountries.reduce((result, country, index, initial) =>
            result + (index === initial.length - 1 ? country._id : `${country._id}|`), '');
          store.actions[moduleName].setParams({ countries: newCountriesParam });
        });
    }, []),
    handleSearchQuery: useCallback((value: string) => {
      setActionOptionIndex(-1);
      setSkip(0);
      setSearchQuery(value);
    }, []),
    switchOptionWithKey: useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === 'ArrowUp') {
        event.preventDefault();
        setActionOptionIndex(prev => prev < 0 ? prev : prev - 1);
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();
        setActionOptionIndex(prev => prev < select.countries.length - 1 ? prev + 1 : prev);
      }
    }, [select.countries]),
  };

  let observer = useMemo(() => new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting && listRef.current &&
      listRef.current.lastElementChild && entries[0].target === listRef.current.lastElementChild) {
      setSkip(skip => skip + 10);
      observer.unobserve(entries[0].target);
    }
  }, {
    root: listRef.current,
    threshold: 1,
  }), []);

  useEffect(() => {
    if (opened && !select.loading) {
      store.actions.countries.load(skip, searchQuery)
        .then((isNeedObserve) => {
          setTimeout(() => {
            if (listRef.current && listRef.current.lastElementChild && isNeedObserve) {
              observer.observe(listRef.current.lastElementChild);
            }
          });
        });
    }

    return () => observer.disconnect();
  }, [opened, skip, searchQuery]);


  return (
    <CustomSelect
      opened={opened}
      toggleSelect={callbacks.toggleSelect}
      closeSelect={callbacks.closeSelect}
      selectedItems={select.selectedCountries}
      selectItem={callbacks.selectOption}
    >
      <CustomSelect.Search
        placeholder={'Поиск'}
        handleChange={callbacks.handleSearchQuery}
        query={searchQuery}
      />
      <CustomSelect.OptionsList
        isLoading={select.loading} listRef={listRef} switchOptionWithKey={callbacks.switchOptionWithKey}
      >
        {select.countries.length > 0 ? select.countries.map((country, index) => {
          const isSelected = select.selectedCountries.some(c => c._id === country._id);
          const isActive = index === activeOptionIndex;
          return (
            <CustomSelect.Option
              key={country.title}
              selected={isSelected}
              active={isActive}
              code={country.code}
              name={country.title}
              handleSelect={callbacks.selectOption(country)}
            />
          );
        }) : <p>Список стран пуст</p>}
      </CustomSelect.OptionsList>
    </CustomSelect>
  );
}

export default CountriesSelect;
