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
    <div className='calenderOnePart'>
      <div>{`${day}`}</div>
      <div>
        <CalenderOnePartStatus status='completed' num={completed} />
        <CalenderOnePartStatus status='confirmed' num={confirmed} />
        <CalenderOnePartStatus status='pending' num={pending} />
      </div>
    </div>
  );
}

// export default CalenderOnePartComponent;
