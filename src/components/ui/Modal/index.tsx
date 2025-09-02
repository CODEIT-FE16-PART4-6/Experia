'use client';

import { ReactNode } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

interface ModalProps {
  modal: { content: ReactNode };
  open: boolean;
  onClose: () => void;
}

const Modal = ({ modal, open, onClose }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
    >
      <DialogPanel className='relative rounded-lg bg-white p-6 shadow-lg'>
        {modal.content}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-white'
        >
          닫기
        </button>
      </DialogPanel>
    </Dialog>
  );
};

export default Modal;
