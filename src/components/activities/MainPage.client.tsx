'use client';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BREAKPOINTS, ITEM_DEFAULT_PAGESIZE, ITEM_PAGESIZE } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Activities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import ActivityList from './ActivityList.client';

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return ITEM_PAGESIZE.lg;
  if (width >= BREAKPOINTS.md) return ITEM_PAGESIZE.md;
  return ITEM_PAGESIZE.sm;
};
type Props = {
  initialData: Activities;
  keyword: string;
  category?: string | null;
  sort?: string | null;
};

const MainPageClient = ({ initialData, keyword, category, sort }: Props) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(ITEM_DEFAULT_PAGESIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth));
  }, [innerWidth, sort]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useSuspenseInfiniteQuery<
      Activities,
      Error,
      InfiniteData<Activities, unknown>,
      [string, number, string | null, string | null, string | null],
      number | null
    >({
      queryKey: ['activities', pageSize, keyword || null, category || null, sort || null],
      queryFn: ({ pageParam = null }) => {
        return fetchServerData<Activities>({
          path: '/activities',
          query: {
            method: 'cursor',
            cursorId: pageParam ?? undefined,
            size: pageSize,
            keyword: keyword || undefined,
            category: category || undefined,
            sort: sort || undefined,
          },
        });
      },
      initialPageParam: null,
      initialData:
        keyword || category || sort ? undefined : { pages: [initialData], pageParams: [null] },
      getNextPageParam: lastPage =>
        lastPage.activities.length > 0 ? lastPage.cursorId : undefined,
      staleTime: 300_000, // 5분
      refetchOnMount: false, // 마운트 시 재요청 비활성화
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 비활성화
    });

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
      <section className='mx-auto mt-[34px] max-w-[1200px]'>
        {keyword && (
          <div className='mb-4'>
            <p className='pb-2 text-2xl text-black md:text-3xl'>
              <strong className='text-nomad-black font-bold'>{keyword}</strong>(으)로 검색한
              결과입니다.
            </p>
            <p className='text-base text-black'>총 {totalCount}개의 결과</p>
          </div>
        )}

        <ActivityList data={data} />

        <div ref={loadMoreRef} className='min-h-10'>
          {totalCount === 0 && (
            <p className='py-55 text-center text-xl text-gray-600 md:text-2xl'>
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
      </section>
    </>
  );
};

export default MainPageClient;
