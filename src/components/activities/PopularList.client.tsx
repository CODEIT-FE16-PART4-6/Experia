'use client';

import { Activity, PopularActivities } from '@/types/schema/activitiesSchema'
import PopularItem from './PopularItem'
import { InfiniteData } from '@tanstack/react-query';

interface PopularListProps {
  data: InfiniteData<PopularActivities, string | null>;
}


const PopularList = ({ data }: PopularListProps) => {
  return (
    <ul className="grid grid-flow-col gap-4 overflow-x-auto auto-cols-[25%]">
      {data.pages.map(page =>
        page.activities.map(activity => (
          <PopularItem key={activity.id} item={activity} />
        ))
      )}
    </ul>
  );
};

export default PopularList;
