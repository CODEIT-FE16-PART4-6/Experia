'use client'

import { BREAKPOINTS, POPULAR_ACTIVITIES_COUNT, POPULAR_ACTIVITIES_VIEW_COUNT } from "@/constants"
import useWindowWidth from "@/hooks/useWindowWidth"
import { Activities, PopularActivities } from "@/types/schema/activitiesSchema"
import { fetchServerData } from "@/utils/api-server"
import { InfiniteData, useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import PopularList from "./PopularList.client"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import LoadingSpinner from "../ui/LoadingSpinner"

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return POPULAR_ACTIVITIES_VIEW_COUNT.lg
  if (width >= BREAKPOINTS.md) return POPULAR_ACTIVITIES_VIEW_COUNT.md
  return POPULAR_ACTIVITIES_VIEW_COUNT.sm
}

const PopularPageClient = ({ initialData }: { initialData: Activities }) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState(POPULAR_ACTIVITIES_COUNT);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerWidth) setPageSize(getPageSize(innerWidth))
  }, [innerWidth])

  /**
   * data를 사용해 현재까지 불러온 모든 아이템을 가로 방향으로 표시
   * hasNextPage가 true이고 사용자가 스크롤을 오른쪽 끝까지 이동했을 때 fetchNextPage()를 호출
   * isFetchingNextPage가 true일 때 오른쪽 끝에서 "로딩 중..." 스피너를 표시
   * isError가 true일 때 "데이터 로딩에 실패했습니다." 메시지를 표시
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery<
    PopularActivities,
    Error,
    // PopularActivities,
    InfiniteData<PopularActivities, string | null>,
    string[],
    string | null | number
  >({
    queryKey: ['popularActivities',],
    queryFn: ({ pageParam = null }) =>
      fetchServerData<PopularActivities>({
        path: '/activities',
        query: {
          method: 'cursor',
          size: pageSize,
          cursorId: pageParam ?? undefined,
        },
      }),
    initialPageParam: null,
    initialData: { pages: [initialData], pageParams: [null] },
    getNextPageParam: lastPage =>
      lastPage?.activities.length > 0 ? lastPage.cursorId : undefined, // 다음 페이지를 불러올 cursorId
  })

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isError) return <div>테이터 로딩에 실패했습니다.</div>
  if (!data) return <div>로딩 중...</div>
  const isFetchingMore = hasNextPage && isFetchingNextPage;

  return (
    <div className="pl-4 lg:px-0 mb-10 md:mb-14 lg:mb-20">
      <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4">
        <PopularList data={data} />
        <div ref={loadMoreRef} className="flex-shrink-0" style={{ width: '1px' }} />
        {isFetchingMore && <LoadingSpinner />}
      </div>

    </div>
  )
}
export default PopularPageClient;