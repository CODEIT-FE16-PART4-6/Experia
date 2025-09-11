import SearchContainer from '@/components/activities/SearchContainer';
import { ITEM_DEFAULT_PAGESIZE } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';
import { fetchServerData } from '@/utils/api-server';

const fetchActivities = async ({ page, size, sort }: { page: number; size: number, sort?: string }) => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: {
      method: 'cursor',
      page,
      size,
      sort, // sort 매개변수를 받아서 사용
    },
    renderType: 'ssr',
  });
  return data;
};

const MainPage = async () => {
  const initialPage = 1;
  const initialData = await fetchActivities({
    page: initialPage,
    size: ITEM_DEFAULT_PAGESIZE,
    sort: 'most_reviewed' // 서버로부터 댓글 많은 순 정렬 방식
  });

  return (
    <main>
      <SearchContainer initialData={initialData} />
    </main>
  );
};

export default MainPage;
