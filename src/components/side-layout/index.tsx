import { cn as bem } from '@bem-react/classname';
import React, { memo } from 'react';
import './style.css';

interface SideLayoutProps {
  children?: React.ReactNode;
  side?: 'start' | 'end' | 'between';
  padding?: 'small' | 'medium';
  direction?: 'row' | 'column';
}

function SideLayout({
                      children,
                      side,
                      padding,
                      direction,
                    }: SideLayoutProps) {
  const cn = bem('SideLayout');
  return (
    <div
      className={cn({
        side,
        padding,
        direction,
      })}
    >
      {React.Children.map(children, (child: React.ReactNode, index) => (
          <div key={index} className={cn('item')}>{child}</div>
        ),
      )}
    </div>
  );
}

SideLayout.defaultProps = {
  direction: 'row',
};

export default memo(SideLayout);
