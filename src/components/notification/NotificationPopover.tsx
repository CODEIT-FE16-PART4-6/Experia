'use client';

import { Fragment, useRef, useState } from 'react';
import clsx from 'clsx';
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

  // 알림 마지막 확인 시각
  const [lastReadNotiAt, setLastReadNotiAt] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('lastReadNotiAt');
  });

  // delete notification
  const deleteNotification = useMutation({
    mutationFn: async (notiId: number) => {
      const res = await fetchClientData(`/my-notifications/${notiId}`, {
        method: 'DELETE',
      });

      if (res && res.status === 204) {
        return;
      }

      if (!res.ok) {
        console.log(res);
        throw new Error('알림 삭제에 실패했습니다.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
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

  // 새 알림 여부 (로컬 스토리지의 알림 확인 시간, 새 알림 발행 시간 비교)
  const hasNewNotifications =
    lastReadNotiAt === null ||
    notifications.some(n => new Date(n.createdAt) > new Date(lastReadNotiAt));

  // 알림 팝오버 닫으면 알림 전체 읽음 처리
  const handlePopoverClose = () => {
    const now = new Date().toISOString();
    setLastReadNotiAt(now);
    localStorage.setItem('lastReadNotiAt', now);
  };

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    root: scrollRef.current,
  });

  return (
    <Popover className='flex'>
      <PopoverButton aria-label='알림 확인하기' className='relative'>
        <AlarmIcon
          className={clsx('hover:text-primary text-gray-700 transition-colors', {
            'text-primary hover:text-primary-dark': hasNewNotifications,
          })}
        />
        <span
          className={clsx(
            'absolute top-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-white bg-red-500',
            hasNewNotifications ? 'block' : 'hidden',
          )}
        ></span>
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
        <PopoverPanel className='absolute right-0 z-[5] mt-14 w-[calc(100vw-40px)] transform shadow-lg sm:w-[368px]'>
          {/* close: PopoverButton 클릭 시 Popover 닫기 */}
          {({ close }) => (
            <div
              ref={scrollRef}
              className='bg-green-light w-full overflow-auto rounded-lg px-5 py-6'
            >
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-bold text-black'>{`알림 ${totalCount || 0}개`}</h2>
                <button
                  type='button'
                  onClick={() => {
                    handlePopoverClose();
                    close();
                  }}
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
                  {notifications.map((noti: Notification) => {
                    const isRead =
                      lastReadNotiAt === null ||
                      new Date(noti.createdAt) <= new Date(lastReadNotiAt);

                    return (
                      <NotificationItem
                        key={noti.id}
                        item={noti}
                        isRead={isRead}
                        onDelete={handleDelete}
                      />
                    );
                  })}
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

                {!hasNextPage && notifications.length > 0 && (
                  <p className='text-md text-primary py-2 text-center'>모든 알림을 불러왔습니다.</p>
                )}
              </div>
            </div>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default NotificationPopover;
