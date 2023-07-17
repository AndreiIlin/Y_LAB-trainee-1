import { cn as bem } from '@bem-react/classname';
import { IArticle } from '@src/store-redux/article/types';
import numberFormat from '@src/utils/number-format';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface ItemBasketProps {
  item: IArticle;
  link: string;
  onLink: () => void;
  onRemove: (_id: string) => void;
  labelCurr: string;
  labelDelete: string;
  labelUnit: string;
  amount: number;
}

function ItemBasket(props: ItemBasketProps) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e: React.MouseEvent<HTMLButtonElement>) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.link
          ? <Link to={props.link} onClick={props.onLink}>{props.item.title}</Link>
          : props.item.title}
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} {props.labelCurr}</div>
        <div className={cn('cell')}>{numberFormat(props.amount || 0)} {props.labelUnit}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{props.labelDelete}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.defaultProps = {
  onRemove: () => {
  },
  labelCurr: '₽',
  labelUnit: 'шт',
  labelDelete: 'Удалить',
};

export default memo(ItemBasket);
