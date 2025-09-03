'use client';

import { useSuspenseInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import ActivityList from './ActivityList.client';
import SearchBarClient from './SearchBar.client';
import SectionTitle from '../ui/Section/SectionTitle';
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
  const [searchQuery, setSearchQuery] = useState('');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  console.log('이니셜 데이터:', initialData)
  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth));
  }, [innerWidth,]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useSuspenseInfiniteQuery<
      Activities,
      Error,
      InfiniteData<Activities, unknown>,
      [string, string, number],
      number | null
    >({
      queryKey: ['activities', searchQuery, pageSize],
      queryFn: ({ pageParam = null }) => {
        const queryParams: { [key: string]: string | number } = {
          method: 'cursor',
          size: pageSize,
        };
        if (pageParam !== null) { queryParams.cursorId = pageParam; }
        if (searchQuery) { queryParams.keyword = searchQuery; }

        return fetchServerData<Activities>({
          path: '/activities',
          query: queryParams,
        });
      },
      initialPageParam: null,
      getNextPageParam: lastPage => {
        return lastPage.activities.length > 0 ? lastPage.cursorId : undefined;
      },
    });

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const isFetchingMore = hasNextPage && isFetchingNextPage;
  const allActivities = data?.pages.flatMap(page => page.activities) ?? [];

  const handleSearch = (query: string) => {
    // 검색어 상태를 업데이트하여 TanStack Query가 새로운 검색 결과를 자동으로 불러오게 합니다.
    setSearchQuery(query);
  };

  return (
    <>
      <SearchBarClient onSearch={handleSearch} />
      <section className="mx-auto max-w-[1200px] mt-[34px] px-4">
        {searchQuery ? (
          <div className='mb-4'>
            <p className='text-black text-2xl md:text-3xl pb-2'>
              <strong className='text-nomad-black font-bold'>{searchQuery}</strong>으로 검색한 결과입니다.
            </p>
            <p className='text-black text-base'>총 {allActivities.length}개의 결과</p>
          </div>
        ) : (
          <SectionTitle title="🌏 모든 체험" />
        )}

        <ActivityList data={data} />
        <div ref={loadMoreRef} className='min-h-10'>
          {isError && (
            <p className='pb-16 text-center'>
              목록 불러오기에 실패했습니다.
              <button className='ml-2 underline underline-offset-4' onClick={() => fetchNextPage()}>
                다시 시도
              </button>
            </p>
          )}
          {!allActivities.length && !isFetchingMore && searchQuery && (
            <p className="text-center py-50 md:py-45 text-gray-600 text-xl md:text-2xl">
              검색 결과가 없습니다.
            </p>
          )}
          {isFetchingMore && <LoadingSpinner />}
        </div>
      </section>
    </>
  );
};

export default MainPageClient;