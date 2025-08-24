import { JSX } from 'react';
import CalenderOnePartComponent from '../calenderOnePart/CalenderOnePart';

type Props = {
  year: number;
  month: number;
};

const CalenderBoardFunction = ({ year, month }: Props) => {
  // 해당 월의 총 일수를 구한다.
  const date: Date = new Date(year, month);
  console.log(date);

  // 해당 월의 1일이 몇요일인지 구한다.
  const day: number = date.getDay();
  console.log('day : ', day);

  // 해당 월이 총 몇일 있는지 확인하기
  const countDays: number = new Date(year, month + 1, 0).getDate();
  console.log('countDays : ', countDays);

  const arr: JSX.Element[] = [];
  // CalenderOnePartComponent를 배열로 입력
  // 빈 컴포넌트 먼저 추가
  if (day > 0) {
    for (let i = 0; i < day; i++) {
      arr.push(
        <CalenderOnePartComponent
          key={`empty-${i}`}
          day='0'
          completed={0}
          confirmed={0}
          pending={0}
        />,
      );
    }
  }

  for (let i = 1; i <= countDays; i++) {
    console.log('countDays : ', i);
    arr.push(
      <CalenderOnePartComponent
        key={`${i}`}
        day={String(i)}
        completed={0}
        confirmed={0}
        pending={0}
      />,
    );
  }

  console.log('arr : ', arr);
  return arr;
};

export default CalenderBoardFunction;
