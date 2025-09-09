import CalenderOnePartStatus from './calenderOnePartStatus/CalenderOnePartStatus';

import CalenderEllipseBlue from '@/assets/imgs/calenderEllipseBlue.svg';
import CalenderEllipseGray from '@/assets/imgs/calenderEllipseGray.svg';

type Props = {
  day: string;
  completed: number;
  confirmed: number;
  pending: number;
  isLastCol?: boolean;
  isLastRow?: boolean;
  isFirstRow?: boolean;
  isLastRowAb?: boolean;
  // 부모로부터 클릭 이벤트를 처리하는 함수를 받기 위한 prop입니다.
  onClick?: () => void;
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
  onClick,
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
      // 전달받은 onClick 함수를 div의 클릭 이벤트에 연결합니다.
      onClick={onClick}
      // onClick prop이 있을 경우, 사용자에게 클릭 가능함을 시각적으로 알리기 위해 cursor-pointer 클래스를 추가합니다.
      className={`${!isLastCol ? '-mr-px' : ''} ${!isLastRow ? '-mb-px' : ''} ${!isFirstRow ? 'border-t' : ''} flex h-[154px] flex-col justify-between border-r border-l border-[#e8e8e8] ${isLastRowAb ? 'border-b' : ''} ${isLastRow ? 'border-b' : ''} ${isLastRow ? 'border-t-[0px]' : ''} ${onClick ? 'cursor-pointer' : ''}`}>
      <div className='flex px-3 py-3 text-[21px]'>
        <p>{`${day}`}</p>
        <div className='mt-1 ml-1'>
          {pending ? <CalenderEllipseBlue /> : completed ? <CalenderEllipseGray /> : ''}
        </div>
      </div>
      <div className='px-[3px] pb-[2px]'>
        <CalenderOnePartStatus status='completed' num={completed} />
        <CalenderOnePartStatus status='confirmed' num={confirmed} />
        <CalenderOnePartStatus status='pending' num={pending} />
      </div>
    </div>
  );
}

// export default CalenderOnePartComponent;
