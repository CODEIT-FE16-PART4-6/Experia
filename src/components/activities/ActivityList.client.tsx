'use client';
import { Activities } from '@/types/schema/activitiesSchema';
import Image from 'next/image';

interface ActivityListProps {
  initialData: Activities;
}

const ActivityList = ({ initialData }: ActivityListProps) => {
  const { activities, totalCount } = initialData;

  return (
    <ul className='mb-12 grid w-full grid-cols-4 grid-rows-2 gap-x-6 gap-y-12'>
      {activities.map(a => (
        <li key={a.id} className='w-[282px] text-black'>
          <figure className='mb-4 h-[282px] w-full overflow-hidden rounded-[20px]'>
            <Image
              src={a.bannerImageUrl}
              alt={a.description}
              width={282}
              height={282}
              className='h-full object-cover'
            />
          </figure>

          <span className='flex gap-1 text-base'>
            <Image src='/icons/StarSmallIcon.svg' alt='별점' width={20} height={20} />
            {a.rating}
            <span className='text-gray-700'>(리뷰 {a.reviewCount}개)</span>
          </span>

          <h4 className='mt-2.5 mb-3.5 text-2xl font-semibold'>{a.title}</h4>

          <h5 className='flex items-center text-2xl font-bold'>
            ₩ {a.price}
            <span className='ml-1 text-xl font-normal text-gray-900'>/ 인</span>
          </h5>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
