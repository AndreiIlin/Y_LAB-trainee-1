import debounce from 'lodash.debounce';
import React, { memo, useCallback, useState } from 'react';
import './style.css';

interface CustomSelectSearchProps {
  placeholder?: string;
  query?: string;
  handleChange: (value: string) => void;
}

function CustomSelectSearch({ placeholder = '', handleChange, query = '' }: CustomSelectSearchProps) {
  const [value, setValue] = useState(() => query);

  const onChangeDebounce = useCallback(
    debounce((value: string) => handleChange(value), 600),
    [handleChange],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  return (
    <input
      className={'CustomSelect-search'}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  );
}

export default memo(CustomSelectSearch);
