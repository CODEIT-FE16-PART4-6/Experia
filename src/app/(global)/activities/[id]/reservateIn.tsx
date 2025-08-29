'use client';

//hooks
import useWindowWidth from '@/hooks/useWindowWidth';

const ReservateIn = () => {
  let winWidth = useWindowWidth(); // 가로 값
  if (!winWidth) {
    winWidth = 0;
  }
  return (
    <>
      {winWidth > 720 ? (
        <div className='h-[423px] w-[251px] rounded-[10px] bg-[#b3b3b3] px-6 pt-6 pb-[18px] lg:h-[746px] lg:w-[340px]'>
          예약 컴포넌트
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ReservateIn;
