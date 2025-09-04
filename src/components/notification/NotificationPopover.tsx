// 'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Popover, PopoverPanel, PopoverButton, Transition } from '@headlessui/react';
import AlarmIcon from '@/assets/icons/AlarmIcon.svg';
import NotiCloseIcon from '@/assets/icons/ic_closeBlack.svg';

const NotificationPopover = () => {
  return (
    <Popover className='flex'>
      <PopoverButton>
        <AlarmIcon className='hover:text-primary text-gray-700 transition-colors' />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <PopoverPanel className='absolute right-0 z-[5] mt-14 w-[calc(100vw-40px)] transform sm:w-[368px]'>
          {/* close: PopoverButton 클릭 시 Popover 닫기 */}
          {({ close }) => (
            <div className='bg-green-light w-full overflow-hidden rounded-lg px-5 py-6 shadow-lg'>
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-bold text-black'>알림 6개</h2>
                <button
                  type='button'
                  onClick={() => close()}
                  className='rounded-md p-2 text-sm text-gray-500 transition-colors hover:bg-[#C5CECB]'
                >
                  <NotiCloseIcon />
                </button>
              </div>

              <ol className='flex max-h-[400px] flex-col gap-2 overflow-y-auto'>
                {/* 승인 알림 */}
                <li className='noti-list'>
                  <span className='bg-red-primary mb-2 inline-block h-1.5 w-1.5 rounded-full'></span>
                  <p className='text-md text-gray-900'>
                    함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이{' '}
                    <b className='text-blue-primary font-normal'>승인</b>되었어요.
                  </p>
                  <span className='mt-1 text-xs text-gray-400'>1분 전</span>
                  <button type='button' className='absolute top-2.5 right-3'>
                    <Image src='/icons/ic_Close.svg' alt='알림 삭제' width={24} height={24} />
                  </button>
                </li>

                {/* 거절 알림 */}
                <li className='noti-list'>
                  <span className='bg-blue-primary mb-2 inline-block h-1.5 w-1.5 rounded-full'></span>
                  <p className='text-md text-gray-900'>
                    오페라 하우스 투어(2023-02-20 10:00~12:00) 예약이{' '}
                    <b className='text-red-primary font-normal'>거절</b>되었어요.
                  </p>
                  <span className='mt-1 text-xs text-gray-400'>12시간 전</span>
                  <button type='button' className='absolute top-2.5 right-3'>
                    <Image src='/icons/ic_Close.svg' alt='알림 삭제' width={24} height={24} />
                  </button>
                </li>
              </ol>
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NotificationPopover;
