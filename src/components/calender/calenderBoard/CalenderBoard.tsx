import { MyActivitiesDto } from '@/utils/api-public/api';
import { JSX } from 'react';
import CalenderBoardFunction from './CalenderBoard.function';

type Props = {
  year: number;
  month: number;
  activities: MyActivitiesDto[];
};

const dayOftheWeek = {
  style:
    'h-full px-[12px] py-[12px] flex items-center bg-white border-l border-t border-b border-[#e8e8e8]',
  onlySun:
    'h-full px-[12px] py-[12px] flex items-center bg-white border-l border-t border-b border-[#e8e8e8] rounded-tl-[10px]',
  onlySat:
    'h-full px-[12px] py-[12px] flex items-center bg-white border border-[#e8e8e8] rounded-tr-[10px]',
};

const CalenderBoard = ({ year, month, activities }: Props) => {
  console.log('CalenderBoard year : ', year);
  console.log('CalenderBoard month : ', month);

  //  const arr: JSX.Element[] = CalenderBoardFunction({ year, month, activities });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = firstDay + daysInMonth;
  const totalRows = Math.ceil(totalCells / 7);

  return (
    <div
      className='grid w-full grid-cols-7 overflow-hidden text-[#969696]'
      style={{ gridTemplateRows: `43px repeat(${totalRows}, 154px)` }}
    >
      <p className={dayOftheWeek.onlySun}>SUN</p>
      <p className={dayOftheWeek.style}>MON</p>
      <p className={dayOftheWeek.style}>TUE</p>
      <p className={dayOftheWeek.style}>WED</p>
      <p className={dayOftheWeek.style}>THUR</p>
      <p className={dayOftheWeek.style}>FRI</p>
      <p className={dayOftheWeek.onlySat}>SAT</p>
      <CalenderBoardFunction year={year} month={month} activities={activities} />
    </div>
  );
};

export default CalenderBoard;
