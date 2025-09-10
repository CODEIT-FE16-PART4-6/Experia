import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  DialogBackdrop,
} from '@headlessui/react';
import Image from 'next/image';
import { ReactNode, Fragment } from 'react';

interface ModalProps {
  modal: { id: string; content: ReactNode };
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
          <DialogPanel className='relative flex h-screen w-screen flex-col space-y-4 rounded-none bg-white px-4 py-8 shadow-lg md:h-auto md:max-w-[480px] md:rounded-3xl md:px-6 md:pt-6 md:pb-10'>
            {modal.content}

            {/* 모달 닫기 버튼 */}
            <button
              onClick={onClose}
              className='absolute top-6 right-2 rounded p-1 hover:bg-gray-300 md:top-4 md:right-4'
            >
              <Image src='/icons/ic_Close.svg' alt='닫기' width={36} height={36} />
            </button>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Modal;
