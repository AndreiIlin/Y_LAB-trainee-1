import { memo } from 'react';
import './style.css';

function Controls({ onAdd }: ControlsProps) {
  return (
    <div className="Controls">
      <button onClick={onAdd}>Добавить</button>
    </div>
  );
}

interface ControlsProps {
  onAdd: () => void;
}

Controls.defaultProps = {
  onAdd: () => {
  },
};

export default memo(Controls);
