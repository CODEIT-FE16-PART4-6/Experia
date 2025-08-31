import { fetchServerData } from '@/utils/api-server';
import { Activities } from '@/types/schema/activitiesSchema';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { ITEM_DEFAULT_PAGESIZE } from '@/constants';
import MainPageClient from '@/components/activities/MainPage.client';
import { Suspense } from 'react';
import ActivityListSkeleton from '@/components/ui/Skeleton/ActivityListSkeleton';

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
      <section className='mx-auto mt-[34px] w-full lg:w-[1200px]'>
        <SectionTitle title='🌏 모든 체험' />

        <Suspense fallback={<ActivityListSkeleton />}>
          <MainPageClient initialData={initialData} />
        </Suspense>
      </section>
    </main>
  );
};

export default MainPage;
