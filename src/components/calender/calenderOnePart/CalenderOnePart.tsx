import CalenderOnePartStatus from './calenderOnePartStatus/CalenderOnePartStatus';

type Props = {
  day: string;
  completed: number;
  confirmed: number;
  pending: number;
  isLastCol?: boolean;
  isLastRow?: boolean;
  isFirstRow?: boolean;
  isLastRowAb?: boolean;
};

export default function CalenderOnePartComponent({
  day,
  completed,
  confirmed,
  pending,
  isLastCol = false,
  isLastRow = false,
  isFirstRow = false,
  isLastRowAb = false,
}: Props) {
  if (day == '0') {
    return (
      <div
        className={`flex h-[154px] flex-col justify-between border-[#e8e8e8] bg-white ${!isLastCol ? '-mr-px' : ''} ${!isLastRow ? '-mb-px' : ''} ${!isFirstRow ? 'border-t' : ''} ${isLastRow ? 'border-b' : ''}`}
        style={{ visibility: 'hidden' }}
      >
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
    <div
      className={`${!isLastCol ? '-mr-px' : ''} ${!isLastRow ? '-mb-px' : ''} ${!isLastRowAb ? 'border-b' : ''} ${!isFirstRow ? 'border-t' : ''} flex h-[154px] flex-col justify-between border-r border-l border-[#e8e8e8] ${isLastRow ? 'border-b' : ''}`}
    >
      <div className='px-3 py-3 text-[21px]'>{`${day}`}</div>
      <div className='px-[3px] pb-[2px]'>
        <CalenderOnePartStatus status='completed' num={completed} />
        <CalenderOnePartStatus status='confirmed' num={confirmed} />
        <CalenderOnePartStatus status='pending' num={pending} />
      </div>
    </div>
  );
}

// export default CalenderOnePartComponent;
