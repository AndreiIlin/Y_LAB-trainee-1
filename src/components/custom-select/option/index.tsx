import { cn as bem } from '@bem-react/classname';
import React, { memo, RefObject, useEffect, useRef } from 'react';
import './style.css';

export interface CustomSelectOptionProps {
  name: string;
  code: string;
  handleSelect: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  selected: boolean;
  active: boolean;
}

function CustomSelectOption({
                              name,
                              code,
                              handleSelect,
                              selected,
                              active,
                            }: CustomSelectOptionProps) {
  const cn = bem('CustomSelect-option');

  const optionRef = useRef<HTMLDivElement>(null);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      handleSelect(event);
    }
  };

  useEffect(() => {
    if (!active || !optionRef.current) return;

      optionRef.current.focus();
      optionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
  }, [active]);

  return (
    <div
      className={cn({ selected, active })} onClick={handleSelect} onKeyUp={handleKeyUp} ref={optionRef} tabIndex={-1}
    >
      <div className={cn('avatar')}>{code}</div>
      <div className={cn('title', { selected })}>{name}</div>
    </div>
  );
}

export default memo(CustomSelectOption);
