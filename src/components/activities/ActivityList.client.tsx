'use client';

import { useEffect, useState } from 'react';
import { BREAKPOINTS, ITEM_PAGESIZE, ITEM_DEFAULT_PAGESIZE } from '@/constants';
import { Activities } from '@/types/schema/activitiesSchema';
import useWindowWidth from '@/hooks/useWindowWidth';
import { useQuery } from '@tanstack/react-query';
import { fetchServerData } from '@/utils/api-server';
import ActivityItem from './ActivityItem';

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
      {data.activities.map(activity => (
        <ActivityItem key={activity.id} item={activity} />
      ))}
    </ul>
  );
};

export default ActivityList;
