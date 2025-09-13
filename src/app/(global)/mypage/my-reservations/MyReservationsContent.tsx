'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';

import ActivityCard from '@/app/(global)/mypage/components/ActivityCard';
import DropdownOptions from '@/components/DropdownOptions';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { MYPAGE_CARDS_COUNT, RESERVATION_STATUS } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { ReservationResponseSchema, ReservationType } from '@/types/schema/reservationSchema';
import fetchClientData from '@/utils/api-client/fetchClientData';

interface fetchReservationsProps {
  cursorId: number | null;
  status?: string;
}

const fetchReservations = async ({ cursorId, status }: fetchReservationsProps) => {
  const params = new URLSearchParams();
  params.set('size', String(MYPAGE_CARDS_COUNT));

  if (cursorId !== null) params.set('cursorId', cursorId.toString());
  if (status) params.set('status', status);

  const response = await fetchClientData(`/my-reservations?${params.toString()}`);
  const validatedData = ReservationResponseSchema.parse(response);

  return validatedData;
};

const MyReservationsContent = () => {
  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get('option');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isPending } =
    useInfiniteQuery({
      queryKey: ['reservationList', selectedStatus],
      queryFn: ({ pageParam }) => {
        return fetchReservations({
          cursorId: pageParam ?? null,
          status: selectedStatus ?? undefined,
        });
      },
      initialPageParam: null as number | null,
      getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    });

  const allReservations = data?.pages.flatMap(page => page.reservations) ?? [];
  const isFetchingMore = hasNextPage && isFetchingNextPage;

  // 필터링된 예약 목록
  const getFilteredReservations = () => {
    if (!allReservations) return [];

    if (!selectedStatus) {
      return allReservations; // 필터가 선택되지 않았으면 모든 예약 표시
    }

    return allReservations.filter(reservation => reservation.status === selectedStatus);
  };

  const filteredReservations = getFilteredReservations();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div className='min-h-screen'>
      <SectionTitle
        title='예약 내역'
        action={
          <DropdownOptions items={RESERVATION_STATUS} placeholderLabel='필터' type='filter' />
        }
      />
      <div className='flex flex-col gap-6 md:gap-4'>
        {isPending && (
          <div className='flex flex-col items-center justify-center gap-2 text-gray-500'>
            <LoadingSpinner /> 목록을 불러오는 중입니다...
          </div>
        )}

        {!isPending &&
          filteredReservations.map(reservation => (
            <ActivityCard
              key={reservation.id}
              type='reservation'
              data={reservation as ReservationType}
            />
          ))}

        {!isPending && filteredReservations.length === 0 && (
          <div className='py-8 text-center text-gray-500'>
            {selectedStatus ? '선택한 필터에 해당하는 예약이 없습니다.' : '예약 내역이 없습니다.'}
          </div>
        )}
      </div>

      <div ref={loadMoreRef} className='min-h-10'>
        {error && (
          <p className='pb-16 text-center'>
            목록 불러오기에 실패했습니다.
            <button className='ml-2 underline underline-offset-4' onClick={() => fetchNextPage()}>
              다시 시도
            </button>
          </p>
        )}

        {isFetchingMore && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default MyReservationsContent;
