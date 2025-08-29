import SectionTitle from '@/components/ui/Section/SectionTitle';
import MyInfoForm from '@/app/(global)/mypage/components/MyInfoForm';

const page = () => {
  return (
    <div>
      <SectionTitle title='내 정보' />
      <MyInfoForm />
    </div>
  );
};
export default page;
