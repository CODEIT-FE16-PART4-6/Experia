'use client';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import PopularList from './PopularList.client';
import { BREAKPOINTS, POPULAR_ACTIVITIES_COUNT, POPULAR_ACTIVITIES_VIEW_COUNT } from '@/constants';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Activities, PopularActivities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return POPULAR_ACTIVITIES_VIEW_COUNT.lg;
  if (width >= BREAKPOINTS.md) return POPULAR_ACTIVITIES_VIEW_COUNT.md;
  return POPULAR_ACTIVITIES_VIEW_COUNT.sm;
};

const PopularPageClient = ({ initialData }: { initialData: Activities }) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(POPULAR_ACTIVITIES_COUNT);
  const sortOrder = 'most_reviewed';

  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth));
  }, [innerWidth]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery<
    PopularActivities,
    Error,
    InfiniteData<PopularActivities, string | null>,
    string[],
    string | null | number
  >({
    queryKey: ['popularActivities', sortOrder],
    queryFn: ({ pageParam = null }) =>
      fetchServerData<PopularActivities>({
        path: '/activities',
        query: {
          method: 'cursor',
          size: pageSize,
          cursorId: pageParam ?? undefined,
          sort: sortOrder,
        },
      }),
    initialPageParam: null,
    initialData: { pages: [initialData], pageParams: [null] },
    getNextPageParam: lastPage => (lastPage?.activities.length > 0 ? lastPage.cursorId : undefined),
  });

  if (isError) return <div>데이터 로딩에 실패했습니다.</div>;
  if (!data) return <div>로딩 중...</div>;

  return (
    <div className='mb-10 px-4 md:mb-14 lg:mb-15 lg:px-0'>
      <PopularList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default PopularPageClient;
