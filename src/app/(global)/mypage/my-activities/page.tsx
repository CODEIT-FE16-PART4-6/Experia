import SectionTitle from '@/components/ui/Section/SectionTitle';

const MyActivitiesPage = () => {
  return (
    <div>
      <SectionTitle
        title='내 체험 관리'
        btnText='체험 등록하기'
        href='/mypage/my-activities/add-new-activity'
      />
    </div>
  );
};

export default MyActivitiesPage;
