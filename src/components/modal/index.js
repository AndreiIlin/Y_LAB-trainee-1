import ModalLayout from '@src/components/modal-layout/index.js';
import { memo } from 'react';
import PropTypes from 'prop-types';

function Modal({
  children,
  title,
  labelClose,
  onClose,
}) {

  return (
    <ModalLayout title={title} labelClose={labelClose} onClose={onClose}>
      {children}
    </ModalLayout>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  labelClose: PropTypes.string,
  onClose: PropTypes.func,
};

export default memo(Modal);
