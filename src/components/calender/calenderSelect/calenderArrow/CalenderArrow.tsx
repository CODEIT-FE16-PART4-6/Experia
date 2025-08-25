import PrevArrowCalender from '@/assets/imgs/prevArrowCalender.svg';
import NextArrowCalender from '@/assets/imgs/nextArrowCalender.svg';

type Props = {
  year: number;
  month: number;
  onClick: (add: boolean) => void;
};

const CalenderArrow = ({ year, month, onClick }: Props) => {
  return (
    <div className='mb-[17px] flex flex-row justify-between gap-4 text-xl font-bold sm:mx-[44px] lg:justify-center lg:gap-[96px]'>
      <div
        className='flex flex-col justify-center hover:cursor-pointer'
        onClick={() => onClick(false)}
      >
        <PrevArrowCalender />
      </div>
      <div>{`${year}년 ${month + 1}월`}</div>
      <div
        className='flex flex-col justify-center hover:cursor-pointer'
        onClick={() => onClick(true)}
      >
        <NextArrowCalender />
      </div>
    </div>
  );
};

export default CalenderArrow;
