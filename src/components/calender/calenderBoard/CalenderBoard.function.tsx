import { MyActivitiesDto } from '@/utils/api-public/api';
import { JSX } from 'react';
import CalenderOnePartComponent from '../calenderOnePart/CalenderOnePart';

type Props = {
  year: number;
  month: number;
  activities: MyActivitiesDto[];
  // 부모 컴포넌트(CalenderBoard.tsx)로부터 날짜 클릭 이벤트를 처리하는 함수를 받습니다.
  onDayClick: (day: number, completed: number, confirmed: number, pending: number) => void;
};

const CalenderBoardFunction = ({ year, month, activities, onDayClick }: Props) => {
  // // 해당 월의 총 일수를 구한다.
  // const date: Date = new Date(year, month);
  // console.log(date);

  // // 해당 월의 1일이 몇요일인지 구한다.
  // const day: number = date.getDay();
  // console.log('day : ', day);

  // // 해당 월이 총 몇일 있는지 확인하기
  const countDays: number = new Date(year, month + 1, 0).getDate();
  console.log('countDays : ', countDays);

  const arr: JSX.Element[] = [];
  // CalenderOnePartComponent를 배열로 입력
  // 빈 컴포넌트 먼저 추가
  const firstDay = new Date(year, month, 1).getDay();
  const totalCells = firstDay + countDays;
  const totalRows = Math.ceil(totalCells / 7);
  let cellIndex = 0;
  if (firstDay > 0) {
    for (let i = 0; i < firstDay; i++) {
      //*****
      const col = cellIndex % 7;
      const row = Math.floor(cellIndex / 7);
      const isLastCol = col === 6;
      const isLastRow = row === totalRows - 1;
      const isFirstRow = row === 0;
      const isLastRowAb = row === totalRows - 2;

      //******
      arr.push(
        <CalenderOnePartComponent
          key={`empty-${i}`}
          day='0'
          completed={0}
          confirmed={0}
          pending={0}
          isLastCol={isLastCol}
          isLastRow={isLastRow}
          isFirstRow={isFirstRow}
          isLastRowAb={isLastRowAb}
        />,
      );
      cellIndex++;
    }
  }

  for (let i = 1; i <= countDays; i++) {
    const col = cellIndex % 7;
    const row = Math.floor(cellIndex / 7);
    const isLastCol = col === 6;
    const isLastRow = row === totalRows - 1;
    const isLastRowAb = row === totalRows - 2;
    const isFirstRow = row === 0;

    let exist: boolean = false;
    for (let j = 0; j < activities.length; j++) {
      const oneDay: number = Number(activities[j].date.split('-')[2]);
      // console.log('oneDay : ', activities[j]);
      if (i == oneDay) {
        arr.push(
          // 각 날짜 컴포넌트에 고유한 key와 클릭 이벤트를 처리할 onClick 핸들러를 전달합니다.
          <CalenderOnePartComponent
            key={`activity-${i}`}
            onClick={() =>
              onDayClick(
                i,
                activities[j].reservations.completed,
                activities[j].reservations.confirmed,
                activities[j].reservations.pending,
              )
            }
            day={String(i)}
            completed={activities[j].reservations.completed}
            confirmed={activities[j].reservations.confirmed}
            pending={activities[j].reservations.pending}
            isLastCol={isLastCol}
            isLastRow={isLastRow}
            isFirstRow={isFirstRow}
            isLastRowAb={isLastRowAb}
          />,
        );
        exist = true;
        break;
      }
    }

    if (!exist) {
      arr.push(
        // 예약이 없는 날짜에도 클릭 이벤트를 처리하기 위해 key와 onClick 핸들러를 전달합니다.
        <CalenderOnePartComponent
          key={`day-${i}`}
          onClick={() => onDayClick(i, 0, 0, 0)}
          day={String(i)}
          completed={0}
          confirmed={0}
          pending={0}
          isLastCol={isLastCol}
          isLastRow={isLastRow}
          isFirstRow={isFirstRow}
          isLastRowAb={isLastRowAb}
        />,
      );
    }
    cellIndex++;
  }

  return <>{arr}</>;
};

export default CalenderBoardFunction;
