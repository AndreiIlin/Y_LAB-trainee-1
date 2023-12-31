import { cn as bem } from '@bem-react/classname';
import { Text } from '@src/i18n/types';
import numberFormat from '@src/utils/number-format';
import { memo } from 'react';
import './style.css';

interface BasketToolProps {
  sum: number;
  amount: number;
  onOpen: () => void;
  t: (text: Text, number?: number) => string;
}

function BasketTool({
                      sum,
                      amount,
                      onOpen,
                      t,
                    }: BasketToolProps) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t('basket.empty')
        }
      </span>
      <button onClick={onOpen}>{t('basket.open')}</button>
    </div>
  );
}

BasketTool.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0,
  t: (text: Text) => text,
};

export default memo(BasketTool);
