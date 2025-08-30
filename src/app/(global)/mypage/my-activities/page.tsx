import SectionTitle from '@/components/ui/Section/SectionTitle';
import { LinkButton } from '@/components/ui/LinkButton';

const MyActivitiesPage = () => {
  return (
    <div>
      <SectionTitle
        title='내 체험 관리'
        action={
          <LinkButton href='/mypage/my-activities/add-new-activity'>체험 등록하기</LinkButton>
        }
      />
    </div>
  );
};

export default MyActivitiesPage;
