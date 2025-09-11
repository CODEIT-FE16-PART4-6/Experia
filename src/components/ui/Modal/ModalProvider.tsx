'use client';
import { useShallow } from 'zustand/shallow';

import useModalStore from '@/stores/modalStore';

import Modal from '.';

const ModalProvider = () => {
  const { modals, closeModal } = useModalStore(
    useShallow(state => ({
      modals: state.modals,
      closeModal: state.closeModal,
    })),
  );

  return (
    <>
      {modals.map((modal, i) => (
        <Modal key={i} modal={modal} open={!modal.closing} onClose={closeModal} />
      ))}
    </>
  );
};

export default ModalProvider;
