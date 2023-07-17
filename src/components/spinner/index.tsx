import { memo, ReactNode } from 'react';
import './style.css';

interface SpinnerProps {
  active: boolean;
  children: ReactNode;
}

function Spinner({ active, children }: SpinnerProps) {
  if (active) {
    return <div className="Spinner">{children}</div>;
  } else {
    return children;
  }
}

Spinner.defaultProps = {};

export default memo(Spinner);
