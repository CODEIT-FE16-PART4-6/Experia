'use client';

import type { InfiniteData } from '@tanstack/react-query';
import { Activity } from '@/types/schema/activitiesSchema';
import ActivityItem from './ActivityItem';

interface ActivitiesResponse {
  activities: Activity[];
}

export interface ActivityListProps {
  data: InfiniteData<ActivitiesResponse>;
}

const ActivityList = ({ data }: ActivityListProps) => {
  return (
    <ul className='mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
      {data.pages.map(page =>
        page.activities.map(activity => <ActivityItem key={activity.id} item={activity} />),
      )}
    </ul>
  );
};

export default ActivityList;
