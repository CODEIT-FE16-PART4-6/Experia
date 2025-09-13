'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import ActivityCard from '@/app/(global)/mypage/components/ActivityCard';
import { LinkButton } from '@/components/ui/LinkButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { MYPAGE_CARDS_COUNT } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { Activities, ActivityType } from '@/types/schema/activitiesSchema';
import fetchClientData from '@/utils/api-client/fetchClientData';

interface fetchMyActivitiesProps {
  cursorId: number | null;
}

const fetchMyActivities = async ({ cursorId }: fetchMyActivitiesProps) => {
  const params = new URLSearchParams();
  params.set('size', String(MYPAGE_CARDS_COUNT));

  if (cursorId !== null) params.set('cursorId', cursorId.toString());

  const response = await fetchClientData(`/my-activities?${params.toString()}`);
  const validatedData = Activities.parse(response);

  return validatedData;
};

const MyActivitiesClient = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isPending, refetch } =
    useInfiniteQuery({
      queryKey: ['myActivities'],
      queryFn: ({ pageParam }) => {
        return fetchMyActivities({
          cursorId: pageParam ?? null,
        });
      },
      initialPageParam: null as number | null,
      getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    });

  const allMyActivities = data?.pages.flatMap(page => page.activities) ?? [];
  const isFetchingMore = hasNextPage && isFetchingNextPage;

  const handleDeleteSuccess = () => {
    refetch(); // 삭제 성공 시 데이터 다시 불러오기
  };

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div className='min-h-screen'>
      <SectionTitle
        title='내 체험 관리'
        action={<LinkButton href='/mypage/my-activities/add-activity'>체험 등록하기</LinkButton>}
      />

      <div className='flex flex-col gap-6 md:gap-4'>
        {isPending && (
          <div className='flex flex-col items-center justify-center gap-2 text-gray-500'>
            <LoadingSpinner /> 목록을 불러오는 중입니다...
          </div>
        )}

        {!isPending &&
          allMyActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              type='activity'
              data={activity as ActivityType}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}

        {!isPending && allMyActivities.length === 0 && (
          <p className='py-8 text-center text-gray-500'>등록하신 체험이 없습니다.</p>
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

export default MyActivitiesClient;
