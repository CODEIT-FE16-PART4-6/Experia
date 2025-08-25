import Image from 'next/image';
import { Activity } from '@/types/schema/activitiesSchema';

const ActivityItem = ({ item }: { item: Activity }) => {
  return (
    <li className='max-w-none text-black lg:max-w-[282px]'>
      <figure className='mb-4 aspect-square w-full overflow-hidden rounded-[20px]'>
        <Image
          src={item.bannerImageUrl}
          alt={item.description}
          width={282}
          height={282}
          className='h-full w-full object-cover'
        />
      </figure>

      <span className='flex gap-1 text-base'>
        <Image src='/icons/StarSmallIcon.svg' alt='별점' width={20} height={20} />
        {item.rating}
        <span className='text-gray-700'>(리뷰 {item.reviewCount}개)</span>
      </span>

      <h4 className='mt-2.5 mb-3.5 text-2xl font-semibold'>{item.title}</h4>

      <h5 className='flex items-center text-2xl font-bold'>
        ₩ {item.price}
        <span className='ml-1 text-xl font-normal text-gray-900'>/ 인</span>
      </h5>
    </li>
  );
};

export default ActivityItem;
