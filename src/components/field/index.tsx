import { cn as bem } from '@bem-react/classname';
import { memo, ReactNode } from 'react';
import './style.css';

interface FieldProps {
  label?: ReactNode;
  error?: ReactNode;
  children?: ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  const cn = bem('Field');
  return (
    <div className={cn()}>
      <label className={cn('label')}>{label}</label>
      <div className={cn('input')}>
        {children}
      </div>
      <div className={cn('error')}>
        {error}
      </div>
    </div>
  );
}

Field.defaultProps = {};

export default memo(Field);
