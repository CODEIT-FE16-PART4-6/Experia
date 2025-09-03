import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  DialogBackdrop,
} from '@headlessui/react';
import { Fragment } from 'react';

interface ModalProps {
  modal: { id: string; content: React.ReactNode };
  open: boolean;
  onClose: () => void;
}

const Modal = ({ modal, open, onClose }: ModalProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        onClose={onClose}
        className='fixed inset-0 z-50 flex items-center justify-center transition'
      >
        {/* 배경 오버레이 */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <DialogBackdrop className='fixed inset-0 bg-black/50' />
        </TransitionChild>

        {/* 모달 본문 */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <DialogPanel className='relative max-w-lg space-y-4 rounded-lg bg-white p-12 shadow-lg'>
            {modal.content}
            <button
              onClick={onClose}
              className='absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-white'
            >
              닫기
            </button>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Modal;
