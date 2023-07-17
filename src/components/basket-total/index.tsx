import { cn as bem } from '@bem-react/classname';
import { Text } from '@src/i18n/types';
import numberFormat from '@src/utils/number-format';
import { memo } from 'react';
import './style.css';

interface BasketTotalProps {
  sum: number;
  t: (text: Text, number?: number) => string;
}

function BasketTotal({
                       sum,
                       t,
                     }: BasketTotalProps) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('basket.total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.defaultProps = {
  sum: 0,
  t: (text: Text) => text,
};

export default memo(BasketTotal);
