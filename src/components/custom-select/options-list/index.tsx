import Spinner from '@src/components/spinner';
import React, { memo, ReactNode, RefObject } from 'react';
import './style.css';

interface CustomSelectOptionsListProps {
  children: ReactNode;
  listRef: RefObject<HTMLDivElement>;
  isLoading: boolean;
  switchOptionWithKey: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

function CustomSelectOptionsList({ children, listRef, isLoading, switchOptionWithKey }: CustomSelectOptionsListProps) {
  return (
    <div
      className={'CustomSelect-options-list'}
      tabIndex={0}
      ref={listRef}
      onKeyDown={switchOptionWithKey}
    >
      <Spinner active={isLoading}>
        {children}
      </Spinner>
    </div>
  );
}

export default memo(CustomSelectOptionsList);
