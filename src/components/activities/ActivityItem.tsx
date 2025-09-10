import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Activity } from '@/types/schema/activitiesSchema';

const ActivityItem = ({ item }: { item: Activity }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <li className='max-w-none text-black lg:max-w-[282px]'>
      <Link href={`/activities/${item.id}`} className='group block'>
        <figure className='relative mb-4 aspect-square w-full overflow-hidden rounded-[20px]'>
          <Image
            src={item.bannerImageUrl}
            alt={item.description}
            width={282}
            height={282}
            className={`h-full w-full object-cover ${isLoaded ? 'blur-0 scale-100 opacity-100' : 'scale-105 opacity-60 blur-md'} `}
            onLoad={() => setIsLoaded(true)}
          />

          {/* hover 시 썸네일 dimmed 처리 */}
          <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100'></div>
        </figure>

        <span className='flex gap-1 text-base'>
          <Image src='/icons/ic_StarSmall.svg' alt='별점' width={20} height={20} />
          {item.rating}
          <span className='text-gray-700'>(리뷰 {item.reviewCount}개)</span>
        </span>

        <h4 className='mt-2 mb-0.5 md:mt-2.5 md:mb-1 text-lg md:text-2xl font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>{item.title}</h4>

        <h5 className='flex items-center text-xl md:text-2xl font-bold'>
          ₩ {item.price.toLocaleString()}
          <span className='ml-1 text-xl font-normal text-gray-900'>/ 인</span>
        </h5>
      </Link>
    </li>
  );
};

export default ActivityItem;
