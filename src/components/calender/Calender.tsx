'use client';

import { MyActivitiesDto } from '@/utils/api-public/api';
import { FindAllMyActivities } from '@/utils/api-public/api-my-activities.api';
import { useEffect, useState } from 'react';
import CalenderBoard from './calenderBoard/CalenderBoard';
import CalenderArrow from './calenderSelect/calenderArrow/CalenderArrow';

const today: Date = new Date();

const CalenderPage = () => {
  const [date, dateSet] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [activities, activitiesSet] = useState<MyActivitiesDto[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const apiMonth = date.month + 1;
        const { body } = await FindAllMyActivities(5699, date.year, apiMonth);
        if (!cancelled && Array.isArray(body)) activitiesSet(body as MyActivitiesDto[]);
      } catch (e) {
        console.error(e);
        if (!cancelled) activitiesSet([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [date.year, date.month]);

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

  console.log('나의 체험에 예약한 리스트 : ', activities);

  return (
    <>
      <h1>Calender Page</h1>
      <CalenderArrow year={date.year} month={date.month} onClick={handelSetMonth} />
      <CalenderBoard year={date.year} month={date.month} activities={activities} />
    </>
  );
};

export default CalenderPage;
