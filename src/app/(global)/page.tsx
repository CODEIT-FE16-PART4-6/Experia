import SearchContainer from '@/components/activities/SearchContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ITEM_DEFAULT_PAGESIZE, POPULAR_ACTIVITIES_COUNT } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';
import { Suspense } from 'react';

const fetchActivities = async ({
  page,
  size,
  sort,
}: {
  page: number;
  size: number;
  sort?: string;
}) => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: {
      method: 'cursor',
      page,
      size,
      sort, // sort 매개변수를 받아서 사용
    },
    renderType: 'isr',
    revalidate: 300,
  });
  return data;
};

const MainPage = async () => {
  const initialPage = 1;

  const allInitialData = await fetchActivities({
    page: initialPage,
    size: ITEM_DEFAULT_PAGESIZE,
    sort: 'latest',
  });

  const popularInitialData = await fetchActivities({
    page: initialPage,
    size: POPULAR_ACTIVITIES_COUNT,
    sort: 'most_reviewed',
  });

  return (
    <main>
      {/* 루트 페이지 isr 렌더링 -> 빌드 시점에 csr 전용 훅이 사용된다는 걸 next가 미리 인지할 수 있도록 Suspense 추가 */}
      <Suspense
        fallback={
          <div className='flex h-screen w-full items-center justify-center'>
            <LoadingSpinner />
          </div>
        }
      >
        <SearchContainer initialData={allInitialData} popularInitialData={popularInitialData} />
      </Suspense>
    </main>
  );
};

export default MainPage;
