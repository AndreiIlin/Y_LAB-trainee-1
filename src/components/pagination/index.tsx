import { cn as bem } from '@bem-react/classname';
import React, { memo } from 'react';
import './style.css';

interface PaginationProps {
  page: number;
  limit: number;
  count: number;
  indent: number;
  onChange: (number: number) => void;
  makeLink: (number: number) => string;
}

function Pagination(props: PaginationProps) {

  // Количество страниц
  const length = Math.ceil(props.count / Math.max(props.limit, 1));

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(props.page - props.indent, 1);
  let right = Math.min(left + props.indent * 2, length);
  // Корректировка когда страница в конце
  left = Math.max(right - props.indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let items = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > 2) items.push(0);
  // Последовательность страниц
  for (let page = left; page <= right; page++) items.push(page);
  // Пропуск
  if (right < length - 1) items.push(0);
  // Последняя страница
  if (right < length) items.push(length);

  const onClickHandler = (number: number) => (e: React.MouseEvent<HTMLLIElement>) => {
    if (props.onChange) {
      e.preventDefault();
      props.onChange(number);
    }
  };

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {items.map((number, index) => (
        <li
          key={index}
          className={cn('item', { active: number === props.page, split: !number })}
          onClick={onClickHandler(number)}
        >
          {number
            ? (props.makeLink
                ? <a href={props.makeLink(number)}>{number}</a>
                : number
            )
            : '...'
          }
        </li>
      ))}
    </ul>
  );
}

Pagination.defaultProps = {
  page: 1,
  limit: 10,
  count: 1000,
  indent: 1,
};

export default memo(Pagination);
