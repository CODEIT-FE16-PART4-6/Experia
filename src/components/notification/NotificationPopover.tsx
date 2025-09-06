'use client';

import { Fragment, useRef } from 'react';
import { Popover, PopoverPanel, PopoverButton, Transition } from '@headlessui/react';
import AlarmIcon from '@/assets/icons/AlarmIcon.svg';
import NotiCloseIcon from '@/assets/icons/ic_closeBlack.svg';
import { useInfiniteQuery, useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NotificationItem from './NotificationItem';
import { Notifications, Notification } from '@/types/schema/notificationSchema';
import fetchClientData from '@/utils/api-client/fetchClientData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { NOTIFICATIONS_PER_PAGE } from '@/constants';

const fetchMyNotifications = async (pageParam: number | null = null) => {
  const cursorQuery = pageParam !== null ? `&cursorId=${pageParam}` : '';
  const data =
    (await fetchClientData(`/my-notifications?size=${NOTIFICATIONS_PER_PAGE}${cursorQuery}`)) || [];
  return data;
};

const NotificationPopover = () => {
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // get notifications
  const { data, isError, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      Notifications,
      Error,
      InfiniteData<Notifications>,
      ['notifications'],
      number | null
    >({
      queryKey: ['notifications'],
      queryFn: ({ pageParam = null }) => fetchMyNotifications(pageParam),
      initialPageParam: null,
      getNextPageParam: lastPage => lastPage.cursorId,
    });

  // delete notification
  const deleteNotification = useMutation({
    mutationFn: async (notiId: number) => {
      const res = await fetchClientData(`/my-notifications/${notiId}`, {
        method: 'DELETE',
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

  const isFetchingMore = hasNextPage && isFetchingNextPage;

  // 알림 전체 합치기
  const notifications = data?.pages.flatMap(page => page.notifications) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    root: scrollRef.current,
  });

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
        <PopoverPanel className='absolute right-0 z-[5] mt-14 w-[calc(100vw-40px)] transform overflow-y-auto sm:w-[368px]'>
          {/* close: PopoverButton 클릭 시 Popover 닫기 */}
          {({ close }) => (
            <div
              ref={scrollRef}
              className='bg-green-light w-full overflow-auto rounded-lg px-5 py-6 shadow-lg'
            >
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-bold text-black'>{`알림 ${totalCount || 0}개`}</h2>
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
              {!isPending && notifications.length === 0 && <p>알림 내역이 없습니다.</p>}

              {!isPending && notifications.length > 0 && (
                <ol
                  aria-live='polite'
                  className='flex max-h-[400px] flex-col gap-2 overflow-y-auto'
                >
                  {notifications.map((noti: Notification) => (
                    <NotificationItem key={noti.id} item={noti} onDelete={handleDelete} />
                  ))}
                </ol>
              )}

              <div ref={loadMoreRef} className='h-4'>
                {isError && (
                  <p className='pb-16 text-center'>
                    알림 불러오기에 실패했습니다.
                    <button
                      className='ml-2 underline underline-offset-4'
                      onClick={() => fetchNextPage()}
                    >
                      다시 시도
                    </button>
                  </p>
                )}
                {isFetchingMore && <LoadingSpinner />}
              </div>
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NotificationPopover;
