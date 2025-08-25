import CalenderOnePartStatus from './calenderOnePartStatus/CalenderOnePartStatus';
import './ClanderOnePart.model.css';

type Props = {
  day: string;
  completed: number;
  confirmed: number;
  pending: number;
};

export default function CalenderOnePartComponent({ day, completed, confirmed, pending }: Props) {
  if (day == '0') {
    return (
      <div className='calenderOnePart' style={{ visibility: 'hidden' }}>
        {/* <div>{`${day}`}</div>
      <div>
        <CalenderOnePartStatus status='completed' num={completed} />
        <CalenderOnePartStatus status='confirmed' num={confirmed} />
        <CalenderOnePartStatus status='pending' num={pending} />
      </div> */}
      </div>
    );
  }
  return (
    <div className='flex h-[154px] flex-col justify-between bg-white'>
      <div className='px-3 py-3 text-[21px]'>{`${day}`}</div>
      <div className='px-[3px] pb-[2px]'>
        <CalenderOnePartStatus styles='bg-blue-100' status='completed' num={completed} />
        <CalenderOnePartStatus styles='bg-red-100' status='confirmed' num={confirmed} />
        <CalenderOnePartStatus styles='bg-gray-100' status='pending' num={pending} />
      </div>
    </div>
  );
}

// export default CalenderOnePartComponent;
