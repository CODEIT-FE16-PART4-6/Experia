'use client';

import { useSuspenseInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import ActivityList from './ActivityList.client';
import { fetchServerData } from '@/utils/api-server';
import { Activities } from '@/types/schema/activitiesSchema';
import { BREAKPOINTS, ITEM_PAGESIZE, ITEM_DEFAULT_PAGESIZE } from '@/constants';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useEffect, useState, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return ITEM_PAGESIZE.lg;
  if (width >= BREAKPOINTS.md) return ITEM_PAGESIZE.md;
  return ITEM_PAGESIZE.sm;
};

const MainPageClient = ({ initialData }: { initialData: Activities }) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(ITEM_DEFAULT_PAGESIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerWidth !== undefined) setPageSize(getPageSize(innerWidth));
  }, [innerWidth]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useSuspenseInfiniteQuery<
      Activities,
      Error,
      InfiniteData<Activities, unknown>,
      [string, number],
      number | null
    >({
      queryKey: ['activities', pageSize],
      queryFn: ({ pageParam = null }) =>
        fetchServerData<Activities>({
          path: '/activities',
          query: { method: 'cursor', cursorId: pageParam ?? undefined, size: pageSize },
        }),
      initialPageParam: null, // 첫 요청 시 cursorId 없음
      getNextPageParam: lastPage => {
        // 응답에 cursorId가 있으면 다음 요청에 사용
        return lastPage.activities.length > 0 ? lastPage.cursorId : undefined;
      },
      initialData: { pages: [initialData], pageParams: [null] }, // 서버에서 받은 데이터로 초기 캐시 세팅
    });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      <ActivityList data={data} />
      <div ref={loadMoreRef} className='min-h-10'>
        {isError && (
          <p className='pb-16 text-center'>
            목록 불러오기에 실패했습니다.
            <button className='underline underline-offset-4' onClick={() => fetchNextPage()}>
              다시 시도
            </button>
          </p>
        )}
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </>
  );
};

export default MainPageClient;
