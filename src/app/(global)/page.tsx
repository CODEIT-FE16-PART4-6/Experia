import SearchContainer from '@/components/activities/SearchContainer';
import { ITEM_DEFAULT_PAGESIZE } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';

const fetchActivities = async ({ page, size }: { page: number; size: number }) => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: { method: 'cursor', page, size },
    renderType: 'ssr',
  });

  return data;
};

const MainPage = async () => {
  const initialPage = 1;
  const initialData = await fetchActivities({ page: initialPage, size: ITEM_DEFAULT_PAGESIZE });

  return (
    <main>
      <SearchContainer initialData={initialData} />
    </main>
  );
};

export default MainPage;
