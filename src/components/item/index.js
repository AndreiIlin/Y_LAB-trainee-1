import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import numberFormat from '@src/utils/number-format';
import './style.css';
import { Link } from 'react-router-dom';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
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

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  labelAdd: PropTypes.string,
  selectItem: PropTypes.func,
  isSelectMode: PropTypes.bool,
  isItemSelected: PropTypes.bool,
};

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
