import SearchContainer from '@/components/activities/SearchContainer';
import { ITEM_DEFAULT_PAGESIZE, POPULAR_ACTIVITIES_COUNT } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';

const fetchActivities = async ({ page, size, sort }: { page: number; size: number, sort?: string }) => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: { method: 'cursor', page, size, sort, },
    renderType: 'ssr',
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
  })

  return (
    <main>
      <SearchContainer
        initialData={allInitialData}
        popularInitialData={popularInitialData} />
    </main>
  );
};

export default MainPage;