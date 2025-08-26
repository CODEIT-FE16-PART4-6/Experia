'use client';

import type { InfiniteData } from '@tanstack/react-query';
import { Activity } from '@/types/schema/activitiesSchema';
import ActivityItem from './ActivityItem';

interface ActivitiesResponse {
  activities: Activity[];
}

export interface ActivityListProps {
  data: InfiniteData<ActivitiesResponse> | undefined;
  isFetching: boolean;
  isError: boolean;
}

const ActivityList = ({ data, isFetching, isError }: ActivityListProps) => {
  if (isFetching && !data) return <div>Loading...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <ul className='mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
      {data?.pages.map(page =>
        page.activities.map(activity => <ActivityItem key={activity.id} item={activity} />),
      )}
    </ul>
  );
};

export default ActivityList;
