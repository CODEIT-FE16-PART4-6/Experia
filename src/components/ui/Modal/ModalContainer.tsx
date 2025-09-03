'use client';
import { useShallow } from 'zustand/shallow';
import useModalStore from '@/stores/modalStore';
import Modal from '.';
import ModalPortal from './ModalPortal';

const ModalContainer = () => {
  const { modals, closeModal } = useModalStore(
    useShallow(state => ({
      modals: state.modals,
      closeModal: state.closeModal,
    })),
  );

  return (
    <ModalPortal>
      {modals.map((modal, i) => (
        <Modal key={i} modal={modal} open={!modal.closing} onClose={closeModal} />
      ))}
    </ModalPortal>
  );
};

export default ModalContainer;
