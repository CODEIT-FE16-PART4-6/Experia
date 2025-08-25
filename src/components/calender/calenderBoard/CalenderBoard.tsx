import { MyActivitiesDto } from '@/utils/api-public/api';
import { JSX } from 'react';
import CalenderBoardFunction from './CalenderBoard.function';
import './CalenderBoard.model.css';

type Props = {
  year: number;
  month: number;
  activities: MyActivitiesDto[];
};

const dayOftheWeek = {
  style: 'w-full h-full border border-[#e8e8e8] px-[12px] py-[12px]',
};

const CalenderBoard = ({ year, month, activities }: Props) => {
  console.log('CalenderBoard year : ', year);
  console.log('CalenderBoard month : ', month);

  const arr: JSX.Element[] = CalenderBoardFunction({ year, month, activities });

  return (
    <div className='grid grid-cols-[repeat(7,49px)] grid-rows-[43px_repeat(5,154px)]'>
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
