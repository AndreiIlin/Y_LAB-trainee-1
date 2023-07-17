import ModalLayout from '@src/components/modal-layout';
import React, { memo } from 'react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  labelClose: string;
  onClose: () => void;
}

function Modal({
                 children,
                 title,
                 labelClose,
                 onClose,
               }: ModalProps) {

  return (
    <ModalLayout title={title} labelClose={labelClose} onClose={onClose}>
      {children}
    </ModalLayout>
  );
}

export default memo(Modal);
