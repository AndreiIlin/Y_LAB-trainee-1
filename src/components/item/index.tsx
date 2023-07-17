import { cn as bem } from '@bem-react/classname';
import { IArticle } from '@src/store-redux/article/types';
import numberFormat from '@src/utils/number-format';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface ItemProps {
  item: IArticle;
  link: string;
  onAdd: (_id: string) => void;
  labelCurr: string;
  labelAdd: string;
  selectItem: () => void;
  isSelectMode: boolean;
  isItemSelected: boolean;
}

function Item(props: ItemProps) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      props.onAdd(props.item._id);
    },
  };

  return (
    <div className={`${cn()} ${props.isItemSelected ? cn({ selected: true }) : ''}`} onClick={props.selectItem}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} {props.labelCurr}</div>
        {!props.isSelectMode && <button onClick={callbacks.onAdd}>{props.labelAdd}</button>}
      </div>
    </div>
  );
}

Item.defaultProps = {
  onAdd: () => {
  },
  labelCurr: '₽',
  labelAdd: 'Добавить',
  selectItem: () => {
  },
  isSelectMode: false,
  isItemSelected: false,
};

export default memo(Item);
