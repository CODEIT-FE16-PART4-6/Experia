'use client';

import { useSuspenseInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import ActivityList from './ActivityList.client';
import SearchBarClient from './SearchBar.client';
import SectionTitle from '../ui/Section/SectionTitle';
import { fetchServerData } from '@/utils/api-server';
import { Activities } from '@/types/schema/activitiesSchema';
import { BREAKPOINTS, ITEM_PAGESIZE, ITEM_DEFAULT_PAGESIZE } from '@/constants';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ActivityListSkeleton from '../ui/Skeleton/ActivityListSkeleton';

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return ITEM_PAGESIZE.lg;
  if (width >= BREAKPOINTS.md) return ITEM_PAGESIZE.md;
  return ITEM_PAGESIZE.sm;
};

const MainPageClient = ({ initialData }: { initialData: Activities }) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(ITEM_DEFAULT_PAGESIZE);
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null);

  console.log('이니셜 데이터:', initialData)
  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth));
  }, [innerWidth,]);

  // 검색어 변경 시 호출
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.trim())
  }, [])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useSuspenseInfiniteQuery<
      Activities,
      Error,
      InfiniteData<Activities, unknown>,
      [string, number, string | null],
      number | null
    >({
      queryKey: ['activities', pageSize, searchQuery || null],
      queryFn: ({ pageParam = null, queryKey }) => {
        const [, , keyword] = queryKey
        return fetchServerData<Activities>({
          path: '/activities',
          query: {
            method: 'cursor',
            cursorId: pageParam ?? undefined,
            size: pageSize,
            keyword: keyword || undefined,
          },
        })
      },
      initialPageParam: null,
      initialData: searchQuery ? undefined : { pages: [initialData], pageParams: [null] },
      getNextPageParam: lastPage =>
        lastPage.activities.length > 0 ? lastPage.cursorId : undefined,
    })

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // 모든 페이지의 활동 목록을 하나의 배열로 병합
  const totalCount = data.pages.flatMap(page => page.activities).length;
  const isFetchingMore = hasNextPage && isFetchingNextPage;

  return (
    <>
      <SearchBarClient onSearch={handleSearch} initialQuery={searchQuery} />

      <section className="mx-auto max-w-[1200px] mt-[34px] px-4">
        {searchQuery ? (
          <div className='mb-4'>
            <p className='text-black text-2xl md:text-3xl pb-2'>
              <strong className='text-nomad-black font-bold'>{searchQuery}</strong>으로 검색한 결과입니다.
            </p>
            <p className='text-black text-base'>총 {totalCount}개의 결과</p>
          </div>
        ) : (
          <SectionTitle title='🌏 모든 체험' />
        )}

        <Suspense fallback={<ActivityListSkeleton />}>
          <ActivityList data={data} />
          <div ref={loadMoreRef} className='min-h-10'>
            {searchQuery && totalCount === 0 && (
              <p className="text-center text-gray-600 text-xl md:text-2xl py-55 ">
                검색 결과가 없습니다.
              </p>
            )}
            {isError && (
              <p className='pb-16 text-center'>
                목록 불러오기에 실패했습니다.
                <button className='ml-2 underline underline-offset-4' onClick={() => fetchNextPage()}>
                  다시 시도
                </button>
              </p>
            )}
            {isFetchingMore && <LoadingSpinner />}
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default MainPageClient;
