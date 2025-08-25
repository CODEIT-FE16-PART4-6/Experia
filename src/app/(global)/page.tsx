import { fetchServerData } from '@/utils/api-server';
import ActivityList from '@/components/activities/ActivityList.client';
import { Activities } from '@/types/schema/activitiesSchema';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { ITEM_MAX_PAGESIZE } from '@/constants';
import getBlurImage from '@/utils/getBlurImage';

const fetchActivities = async ({ page, size }: { page: number; size: number }) => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: { method: 'offset', page, size },
  });

  return data;
};

const MainPage = async () => {
  const initialPage = 1;
  const initialSize = ITEM_DEFAULT_PAGESIZE;
  const initialData = await fetchActivities({ page: initialPage, size: initialSize });

  // 체험 이미지 blur placeholder 처리
  const dataWithblurImageUrl = await Promise.allSettled(
    initialData.activities.map(async a => {
      const blur = await getBlurImage(a.bannerImageUrl);
      return { ...a, blurDataUrl: blur };
    }),
  );

  const activities = dataWithblurImageUrl.map((res, i) => {
    if (res.status === 'fulfilled') return res.value; // allSettled 성공 시 blurDataUrl 붙은 객체 반환

    return { ...initialData.activities[i], blurDataUrl: null }; // allSettled 실패 시 blurDataUrl 미적용
  });

  return (
    <main>
      <section className='mx-auto mt-[34px] w-full lg:w-[1200px]'>
        <SectionTitle title='🌏 모든 체험' />
        <ActivityList
          initialData={{ ...initialData, activities: activities }}
          initialPage={initialPage}
        />
      </section>
    </main>
  );
};

export default MainPage;
