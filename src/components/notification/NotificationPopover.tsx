'use client';

import { Fragment } from 'react';
import { Popover, PopoverPanel, PopoverButton, Transition } from '@headlessui/react';
import AlarmIcon from '@/assets/icons/AlarmIcon.svg';
import NotiCloseIcon from '@/assets/icons/ic_closeBlack.svg';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { REQUEST_URL } from '@/utils/api-public';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NotificationItem from './NotificationItem';
import { Notifications, Notification } from '@/types/schema/notificationSchema';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1Njk3NjE2OCwiZXhwIjoxNzU4MTg1NzY4LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.lePtE130uzXS1OoDUpDFSizdbe0g2inepQgioD2FhsY';

const fetchMyNotifications = async () => {
  const res = await fetch(`${REQUEST_URL}/my-notifications`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = (await res.json()) || [];
  return data;
};

const NotificationPopover = () => {
  const queryClient = useQueryClient();

  // get notifications
  const { data, isError, isPending } = useQuery<Notifications>({
    queryKey: ['notification'],
    queryFn: fetchMyNotifications,
  });

  // delete notification
  const deleteNotification = useMutation({
    mutationFn: async (notiId: number) => {
      const res = await fetch(`${REQUEST_URL}/my-notifications/${notiId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('알림 삭제에 실패했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
    onError: err => {
      alert(err.message);
    },
  });

  const handleDelete = (notiId: number) => {
    deleteNotification.mutate(notiId);
  };

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
                <h2 className='text-lg font-bold text-black'>{`알림 ${data?.totalCount || 0}개`}</h2>
                <button
                  type='button'
                  onClick={() => close()}
                  className='rounded-md p-2 text-sm text-gray-500 transition-colors hover:bg-[#C5CECB]'
                >
                  <NotiCloseIcon />
                </button>
              </div>

              {isPending && <LoadingSpinner />}
              {isError && <p>알림 내역을 불러오지 못했습니다.</p>}
              {data && data.notifications.length === 0 && <p>알림 내역이 없습니다.</p>}

              {data && data.notifications.length > 0 && (
                <ol
                  aria-live='polite'
                  className='flex max-h-[400px] flex-col gap-2 overflow-y-auto'
                >
                  {data.notifications.map((noti: Notification) => (
                    <NotificationItem key={noti.id} item={noti} onDelete={handleDelete} />
                  ))}
                </ol>
              )}
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NotificationPopover;
