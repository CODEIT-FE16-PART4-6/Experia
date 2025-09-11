'use client'

import { BREAKPOINTS, POPULAR_ACTIVITIES_COUNT, POPULAR_ACTIVITIES_VIEW_COUNT } from "@/constants";
import useWindowWidth from '@/hooks/useWindowWidth';
import { Activities, PopularActivities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import PopularList from '@/components/activities/PopularList.client';

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return POPULAR_ACTIVITIES_VIEW_COUNT.lg;
  if (width >= BREAKPOINTS.md) return POPULAR_ACTIVITIES_VIEW_COUNT.md;
  return POPULAR_ACTIVITIES_VIEW_COUNT.sm;
}

const PopularPageClient = ({ initialData }: { initialData: Activities }) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(POPULAR_ACTIVITIES_COUNT);
  const sortOrder = 'most_reviewed';

  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth));
  }, [innerWidth]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useSuspenseInfiniteQuery<
    PopularActivities,
    Error,
    InfiniteData<PopularActivities, string | null>,
    [string, string, number],
    string | null | number
  >({
    queryKey: ['popularActivities', sortOrder, pageSize],
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
    getNextPageParam: lastPage =>
      lastPage?.activities.length > 0 ? lastPage.cursorId : undefined,
  })

  if (isError) return <div>목록 불러오기에 실패했습니다.</div>;

  return (
    <div className='px-4 lg:px-0 mb-10 md:mb-14 lg:mb-15'>
      <PopularList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  )
}

export default PopularPageClient;
