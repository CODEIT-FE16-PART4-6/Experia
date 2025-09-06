'use client';

import useModalStore from '@/stores/modalStore';
import { MyActivitiesDto } from '@/utils/api-public/api';
import {
  FindAllMyActivities,
  FindAllMyActivitiesData,
} from '@/utils/api-public/api-my-activities.api';
import { useEffect, useState } from 'react';
import CalenderBoard from './calenderBoard/CalenderBoard';
import CalenderArrow from './calenderSelect/calenderArrow/CalenderArrow';
import PopOver from './popOver/PopOver';
import SelectMyActivity from './selectMyActivity/SelectMyActivity';

const today: Date = new Date();

const CalenderPage = () => {
  // 전역 상태 관리를 위한 useModalStore 훅 사용. openModal 함수를 가져옵니다.
  const { openModal } = useModalStore();

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

  // CalenderBoard의 날짜(day) 컴포넌트 클릭 시 실행되는 핸들러
  const handleDayClick = (day: number, completed: number, confirmed: number, pending: number) => {
    // 예약 현황(completed, confirmed, pending)이 모두 0이면 아무 작업도 수행하지 않고 리턴합니다.
    if (completed === 0 && confirmed === 0 && pending === 0) {
      return;
    }

    // 클릭된 날짜를 YYYY-MM-DD 형식의 문자열로 조합합니다.
    const monthStr = String(date.month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const fullDate = `${date.year}-${monthStr}-${dayStr}`;

    // 전역 스토어의 openModal 함수를 호출하여 PopOver 컴포넌트를 모달 내용으로 전달합니다.
    openModal(<PopOver activityId={activityId} date={fullDate} />);
  };

  console.log('나의 체험에 예약한 리스트 : ', activities);

  return (
    <div className='mx-[17px] mb-4 sm:mx-[23px]'>
      <SelectMyActivity list={activitiesList} onChange={handleSetActivityId} />
      <CalenderArrow year={date.year} month={date.month} onClick={handelSetMonth} />
      {/* 
        달력의 날짜 클릭 이벤트를 처리하기 위해 onDayClick 핸들러를 props로 전달합니다.
        이전에는 모달을 직접 렌더링했지만, 이제 전역 스토어를 통해 처리되므로 관련 코드를 삭제했습니다.
      */}
      <CalenderBoard
        year={date.year}
        month={date.month}
        activities={activities}
        onDayClick={handleDayClick}
      />
    </div>
  );
};

export default CalenderPage;
