'use client';
import Reservation from '@/app/(global)/activities/components/Reservation';
import { ActivityDetail } from '@/types/schema/activitiesSchema';

interface Props {
  data: ActivityDetail;
}
const ReservateIn = ({ data }: Props) => {
  return (
    <>
      <div className='hidden h-[423px] w-[251px] rounded-[10px] bg-[#b3b3b3] px-6 pt-6 pb-[18px] md:block lg:h-[746px] lg:w-[340px]'>
        <Reservation data={data} />
      </div>
    </>
  );
};
export default ReservateIn;
