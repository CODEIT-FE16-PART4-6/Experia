import { fetchServerData } from '@/utils/api-server';
import ActivityList from '@/components/activities/ActivityList.client';
import { Activities } from '@/types/schema/activitiesSchema';
import SectionTitle from '@/components/ui/Section/SectionTitle';

const fetchActivities = async () => {
  const data = await fetchServerData<Activities>({
    path: '/activities',
    query: { method: 'offset', page: 1, size: 20 },
  });

  return data;
};

const MainPage = async () => {
  const data = await fetchActivities();

  return (
    <main>
      <section className='mx-auto mt-[34px] w-[1200px]'>
        <SectionTitle title='🌏 모든 체험' />
        <ActivityList initialData={data} />
      </section>
    </main>
  );
};

export default MainPage;
