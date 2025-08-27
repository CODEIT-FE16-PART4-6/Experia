import { fetchServerData } from '@/utils/api-server';
import { Activities } from '@/types/schema/activitiesSchema';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { ITEM_DEFAULT_PAGESIZE } from '@/constants';
import getBlurImage from '@/utils/getBlurImage';
import MainPageClient from '@/components/activities/MainPage.client';

const fetchActivities = async ({ page, size }: { page: number; size: number }) => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: { method: 'cursor', page, size },
    renderType: 'ssg',
  });

  return data;
};

const MainPage = async () => {
  const initialPage = 1;
  const initialSize = ITEM_DEFAULT_PAGESIZE;
  const initialData = await fetchActivities({ page: initialPage, size: initialSize });

  // 체험 이미지 blur placeholder 처리
  const dataWithBlurImageUrl = await Promise.allSettled(
    initialData.activities.map(async a => {
      const blur = await getBlurImage(a.bannerImageUrl);
      return { ...a, blurDataUrl: blur };
    }),
  );

  const activities = dataWithBlurImageUrl.map((res, i) => {
    if (res.status === 'fulfilled') return res.value; // allSettled 성공 시 blurDataUrl 붙은 객체 반환
    return { ...initialData.activities[i], blurDataUrl: null }; // allSettled 실패 시 blurDataUrl 미적용
  });

  return (
    <main>
      <section className='mx-auto mt-[34px] w-full lg:w-[1200px]'>
        <SectionTitle title='🌏 모든 체험' />
        <MainPageClient initialData={{ ...initialData, activities: activities }} />
      </section>
    </main>
  );
};

export default MainPage;
