import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalContentLayout({ children }) {
  return (
    <div className={'ModalContentLayout'}>{children}</div>
  );
}

ModalContentLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(ModalContentLayout);
