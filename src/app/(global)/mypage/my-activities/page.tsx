import SectionTitle from '@/components/ui/Section/SectionTitle';
import { LinkButton } from '@/components/ui/LinkButton';
import ActivityCard from '../components/ActivityCard';
import { ActivityType } from '@/types/schema/activitiesSchema';

const MyActivitiesPage = () => {
  return (
    <div>
      <SectionTitle
        title='내 체험 관리'
        action={
          <LinkButton href='/mypage/my-activities/add-new-activity'>체험 등록하기</LinkButton>
        }
      />
      <ActivityCard type='activity' data={res as ActivityType} />
    </div>
  );
};

export default MyActivitiesPage;
