import AddActivityForm from '../../components/AddActivityForm';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import Link from 'next/link';
import ArrowLeftIcon from '@/assets/icons/ic_arrowLeftLine.svg';
import Button from '@/components/Button';

const AddNewActivityPage = () => {
  return (
    <section>
      <Link
        href='/mypage/myActivities'
        className='group hover:text-primary mb-4 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base text-gray-600 hover:bg-gray-200'
      >
        <ArrowLeftIcon className='group-hover:text-primary h-4 w-4 text-gray-600' />
        돌아가기
      </Link>
      <SectionTitle
        title='내 체험 등록'
        action={
          <Button variant='POSITIVE' size='md'>
            등록하기
          </Button>
        }
      />
      <AddActivityForm />
    </section>
  );
};

export default AddNewActivityPage;
