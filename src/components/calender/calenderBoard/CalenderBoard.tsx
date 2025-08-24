import { JSX } from 'react';
import CalenderBoardFunction from './CalenderBoard.function';
import './CalenderBoard.model.css';

type Props = {
  year: number;
  month: number;
};

const CalenderBoard = ({ year, month }: Props) => {
  console.log('CalenderBoard year : ', year);
  console.log('CalenderBoard month : ', month);

  const arr: JSX.Element[] = CalenderBoardFunction({ year, month });

  return (
    <div className='CalenderBoard'>
      <p>SUM</p>
      <p>MON</p>
      <p>TUE</p>
      <p>WED</p>
      <p>THUR</p>
      <p>FRI</p>
      <p>SAT</p>
      {arr}
    </div>
  );
};

export default CalenderBoard;
