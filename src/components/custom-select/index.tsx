import { cn as bem } from '@bem-react/classname';
import CustomSelectOption from '@src/components/custom-select/option';
import CustomSelectOptionsList from '@src/components/custom-select/options-list';
import CustomSelectSearch from '@src/components/custom-select/search';
import { ICountry } from '@src/store/countries/types';
import React, { memo, useEffect, useRef } from 'react';
import './style.css';

interface CustomSelectProps {
  opened: boolean;
  toggleSelect: () => void;
  closeSelect: () => void;
  selectedItems: ICountry[];
  children?: React.ReactNode;
  selectItem: (country: ICountry) => (event: React.MouseEvent<HTMLDivElement>) => void;
}

function CustomSelect({ toggleSelect, closeSelect, opened, selectedItems, selectItem, children }: CustomSelectProps) {
  const cn = bem('CustomSelect');

  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current || !selectRef.current) return;
      if (!menuRef.current.contains(event.target as Node) && !selectRef.current.contains(event.target as Node)) {
        closeSelect();
      }
    };
    const handleLastElementTab = (event: KeyboardEventInit) => {
      if (!menuRef.current || !selectRef.current) return;
      if (!menuRef.current.contains(document.activeElement) && !selectRef.current.contains(document.activeElement) && event.key === 'Tab') {
        closeSelect();
        selectRef.current.focus();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keyup', handleLastElementTab);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keyup', handleLastElementTab);
    };
  }, [opened, closeSelect]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { code } = event;

    if ((code === 'ArrowDown' || code === 'ArrowUp' || code === 'Space') && !opened) {
      event.preventDefault();
      toggleSelect();
    }

    if (code === 'Escape' && opened) {
      event.preventDefault();
      closeSelect();
      if (selectRef.current) {
        selectRef.current.focus();
      }
    }
  };

  return (
    <div
      className={cn('')}
      ref={selectRef}
      tabIndex={0}
      aria-label={'select'}
      onKeyUp={handleKeyUp}
    >
      <div className={cn('dropdown')} onClick={toggleSelect}>
        <div className={cn('dropdown-selected')}>
          {selectedItems.map(item => (
            <div
              className={cn('dropdown-selected-item')}
              onClick={selectItem(item)}
              key={item.title}
            >
              <div className={cn('dropdown-avatar')}>{item.code}</div>
              <div className={cn('dropdown-title')}>{item.title}</div>
            </div>
          ))}
        </div>

        <svg
          className={cn('dropdown-toggle', { opened: opened })}
          xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 18 18" fill="none"
        >
          <path
            fillRule="evenodd" clipRule="evenodd"
            d="M4.41076 6.91073C4.7362 6.5853 5.26384 6.5853 5.58928 6.91073L10 11.3215L14.4108 6.91073C14.7362 6.5853 15.2638 6.5853 15.5893 6.91073C15.9147 7.23617 15.9147 7.76381 15.5893 8.08925L10.5893 13.0892C10.2638 13.4147 9.7362 13.4147 9.41076 13.0892L4.41076 8.08925C4.08533 7.76381 4.08533 7.23617 4.41076 6.91073Z"
            fill="black"
          />
        </svg>
      </div>
      {opened && (
        <div className={cn('menu')} ref={menuRef}>
          {children}
        </div>
      )}
    </div>
  );
}

export default Object.assign(memo(CustomSelect), {
  'Option': CustomSelectOption,
  'Search': CustomSelectSearch,
  'OptionsList': CustomSelectOptionsList,
});
