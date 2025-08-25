import { MyActivitiesDto } from '@/utils/api-public/api';
import { JSX } from 'react';
import CalenderBoardFunction from './CalenderBoard.function';

type Props = {
  year: number;
  month: number;
  activities: MyActivitiesDto[];
};

const dayOftheWeek = {
  style: 'h-full px-[12px] py-[12px] flex items-center bg-white',
};

const CalenderBoard = ({ year, month, activities }: Props) => {
  console.log('CalenderBoard year : ', year);
  console.log('CalenderBoard month : ', month);

  const arr: JSX.Element[] = CalenderBoardFunction({ year, month, activities });

  return (
    <div className='grid w-full grid-cols-7 grid-rows-[43px_repeat(5,154px)] gap-[1px] overflow-hidden rounded-[10px] border border-[#e8e8e8] bg-[#e8e8e8] text-[#969696]'>
      <p className={dayOftheWeek.style}>SUN</p>
      <p className={dayOftheWeek.style}>MON</p>
      <p className={dayOftheWeek.style}>TUE</p>
      <p className={dayOftheWeek.style}>WED</p>
      <p className={dayOftheWeek.style}>THUR</p>
      <p className={dayOftheWeek.style}>FRI</p>
      <p className={dayOftheWeek.style}>SAT</p>
      {arr}
    </div>
  );
};

export default CalenderBoard;
