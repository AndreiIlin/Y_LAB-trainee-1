import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ButtonsGroup({ children }) {
  return (
    <div className={'ButtonsGroup'}>
      {children}
    </div>
  );
}

ButtonsGroup.propTypes = {
  children: PropTypes.node,
};

export default memo(ButtonsGroup);
