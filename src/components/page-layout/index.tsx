import { cn as bem } from '@bem-react/classname';
import { memo, ReactNode } from 'react';
import './style.css';

interface PageLayoutProps {
  head?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

function PageLayout({ head, footer, children }: PageLayoutProps) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
    </div>
  );
}

export default memo(PageLayout);
