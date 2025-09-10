import Link from 'next/link';

import ArrowLeftIcon from '@/assets/icons/ic_arrowLeftLine.svg';

import ActivityForm from '../../components/ActivityForm';

const AddNewActivityPage = () => {
  return (
    <section>
      <Link
        href='/mypage/my-activities'
        className='group hover:text-primary mb-4 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-base text-gray-600 hover:bg-gray-200'
      >
        <ArrowLeftIcon className='group-hover:text-primary h-4 w-4 text-gray-600' />
        돌아가기
      </Link>
      <ActivityForm />
    </section>
  );
};

export default AddNewActivityPage;
