'use client';

// import '@/app/globals.css';
import { MyActivitiesDto } from '@/utils/api-public/api';
import {
  FindAllMyActivities,
  FindAllMyActivitiesData,
} from '@/utils/api-public/api-my-activities.api';
import { useEffect, useState } from 'react';
import CalenderBoard from './calenderBoard/CalenderBoard';
import CalenderArrow from './calenderSelect/calenderArrow/CalenderArrow';
import SelectMyActivity from './selectMyActivity/SelectMyActivity';

const today: Date = new Date();

const CalenderPage = () => {
  const [date, dateSet] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  console.log('CalenderPage start');

  const [activities, activitiesSet] = useState<MyActivitiesDto[]>([]);
  const [activitiesList, activitiesListSet] = useState<{ id: number; activityName: string }[]>([]);
  const [activityId, activityIdSet] = useState<number>(0);

  useEffect(() => {
    (async () => {
      console.log('CalenderPage activitiesList  start');
      const { body } = await FindAllMyActivitiesData(1000);
      console.log('CalenderPage activitiesList : ', body);
      if (body.totalCount > 0) {
        activitiesListSet(
          body.activities.map(ele => {
            const listEle = {
              id: ele.id,
              activityName: ele.title,
            };
            console.log('activitiesListSet listEle : ', listEle);
            return listEle;
          }),
        );
      }
    })();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const apiMonth = date.month + 1;
        if (activityId > 0) {
          const { body } = await FindAllMyActivities(activityId, date.year, apiMonth);
          if (!cancelled && Array.isArray(body)) activitiesSet(body as MyActivitiesDto[]);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) activitiesSet([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [date.year, date.month, activityId]);

  console.log('CalenderPage date : ', date);

  const handelSetMonth = (add: boolean = true) => {
    let month = date.month;
    let year = date.year;
    if (add) {
      if (month + 1 > 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
    } else {
      if (month - 1 < 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
    }

    dateSet({ year, month });
  };

  const handleSetActivityId = (id: number) => {
    if (id != activityId) {
      activityIdSet(id);
    }
  };

  console.log('나의 체험에 예약한 리스트 : ', activities);

  return (
    <div className='mx-[17px] mb-4 sm:mx-[23px]'>
      <SelectMyActivity list={activitiesList} onChange={handleSetActivityId} />
      <CalenderArrow year={date.year} month={date.month} onClick={handelSetMonth} />
      <CalenderBoard year={date.year} month={date.month} activities={activities} />
    </div>
  );
};

export default CalenderPage;
