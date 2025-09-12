'use client';
import { useShallow } from 'zustand/shallow';

import Modal from '.';
import useModalStore from '@/stores/modalStore';


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
