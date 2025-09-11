import { JSX } from 'react';

import { MyActivitiesDto } from '@/utils/api-public/api';

import CalenderOnePartComponent from '../calenderOnePart/CalenderOnePart';

type Props = {
  year: number;
  month: number;
  activities: MyActivitiesDto[];
  // 부모 컴포넌트(CalenderBoard.tsx)로부터 날짜 클릭 이벤트를 처리하는 함수를 받습니다.
  onDayClick: (day: number, completed: number, confirmed: number, pending: number) => void;
};

const CalenderBoardFunction = ({ year, month, activities, onDayClick }: Props) => {
  const countDays: number = new Date(year, month + 1, 0).getDate();

  const arr: JSX.Element[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const totalCells = firstDay + countDays;
  const totalRows = Math.ceil(totalCells / 7);
  let cellIndex = 0;
  if (firstDay > 0) {
    for (let i = 0; i < firstDay; i++) {
      const col = cellIndex % 7;
      const row = Math.floor(cellIndex / 7);
      const isLastCol = col === 6;
      const isLastRow = row === totalRows - 1;
      const isFirstRow = row === 0;
      const isLastRowAb = row === totalRows - 2;

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
      if (i == oneDay) {
        arr.push(
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
