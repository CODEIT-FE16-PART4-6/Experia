'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BREAKPOINTS, ITEM_PAGESIZE, ITEM_DEFAULT_PAGESIZE } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useQuery } from '@tanstack/react-query';
import { fetchServerData } from '@/utils/api-server';

interface ActivityListProps {
  initialData: Activities;
  initialPage: number;
}

const getPageSize = (width: number) => {
  if (width >= BREAKPOINTS.lg) return ITEM_PAGESIZE.lg;
  if (width >= BREAKPOINTS.md) return ITEM_PAGESIZE.md;
  return ITEM_PAGESIZE.sm;
};

const ActivityList = ({ initialData, initialPage }: ActivityListProps) => {
  const innerWidth = useWindowWidth();
  const [pageSize, setPageSize] = useState<number>(ITEM_DEFAULT_PAGESIZE);

  useEffect(() => {
    if (innerWidth !== undefined) {
      setPageSize(getPageSize(innerWidth));
    }
  }, [innerWidth]);

  const { data, isPending } = useQuery({
    queryKey: ['activities', initialPage, pageSize],
    queryFn: () => {
      return fetchServerData<Activities>({
        path: '/activities',
        query: { method: 'offset', page: initialPage, size: pageSize },
      });
    },
    initialData,
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <ul className='mb-12 grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-12 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2'>
      {data.activities.map(a => (
        <li key={a.id} className='max-w-none text-black lg:max-w-[282px]'>
          <figure className='mb-4 aspect-square w-full overflow-hidden rounded-[20px]'>
            <Image
              src={a.bannerImageUrl}
              alt={a.description}
              width={282}
              height={282}
              className='h-full w-full object-cover'
            />
          </figure>

          <span className='flex gap-1 text-base'>
            <Image src='/icons/ic_StarSmall.svg' alt='별점' width={20} height={20} />
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
