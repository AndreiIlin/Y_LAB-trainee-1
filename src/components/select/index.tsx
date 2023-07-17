import React, { memo } from 'react';
import './style.css';

interface SelectProps {
  options: {
    value: string;
    title: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

function Select(props: SelectProps) {

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value as typeof props.value);
  };

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>{item.title}</option>
      ))}
    </select>
  );
}

export default memo(Select);
