import { memo, ReactNode } from 'react';
import './style.css';

interface ButtonsGroupProps {
  children: ReactNode;
}

function ButtonsGroup({ children }: ButtonsGroupProps) {
  return (
    <div className={'ButtonsGroup'}>
      {children}
    </div>
  );
}

export default memo(ButtonsGroup);
