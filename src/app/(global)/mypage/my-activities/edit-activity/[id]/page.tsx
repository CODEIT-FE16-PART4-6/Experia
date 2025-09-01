import ActivityForm from '../../../components/ActivityForm';
import Link from 'next/link';
import ArrowLeftIcon from '@/assets/icons/ic_arrowLeftLine.svg';
import { fetchServerData } from '@/utils/api-server';
import { ActivityFormValues } from '@/types/schema/activitiesSchema';

interface EditActivityPageProps {
  params: Promise<{ id: string }>;
}

const EditActivityPage = async ({ params }: EditActivityPageProps) => {
  const { id } = await params; // activityId
  const activity = await fetchServerData<ActivityFormValues>({ path: `/activities/${id}` });

  return (
    <section>
      <Link
        href='/mypage/my-activities'
        className='group hover:text-primary mb-4 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base text-gray-600 hover:bg-gray-200'
      >
        <ArrowLeftIcon className='group-hover:text-primary h-4 w-4 text-gray-600' />
        돌아가기
      </Link>
      <ActivityForm initialData={activity} />
    </section>
  );
};

export default EditActivityPage;
