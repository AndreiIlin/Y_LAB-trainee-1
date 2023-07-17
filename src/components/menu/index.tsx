import { cn as bem } from '@bem-react/classname';
import { INavigationMenuOption } from '@src/containers/navigation/types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface MenuProps {
  items: INavigationMenuOption[];
  onNavigate: (item: INavigationMenuOption) => void;
}

function Menu({ items, onNavigate }: MenuProps) {
  const cn = bem('Menu');
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigate(item)}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

Menu.defaultProps = {
  items: [],
  onNavigate: () => {
  },
};

export default memo(Menu);
