import React, { memo } from 'react';
import './style.css';

interface ListProps<ItemType> {
  list: ItemType[];
  renderItem: (item: ItemType) => React.ReactNode;
}

function List<ItemType extends {_id: string}>({
                                          list,
                                          renderItem,
                                        }: ListProps<ItemType>): React.ReactElement {
  return (
    <div className="List">{
      list.map((item) =>
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>,
      )}
    </div>
  );
}

export default (List);
