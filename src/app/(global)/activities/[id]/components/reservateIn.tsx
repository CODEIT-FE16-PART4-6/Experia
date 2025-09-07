'use client';
import Reservation from '@/app/(global)/activities/[id]/components/Reservation';
import { ActivityDetail } from '@/types/schema/activitiesSchema';

interface Props {
  data: ActivityDetail;
}
const ReservateIn = ({ data }: Props) => {
  return (
    <>
      <div
        className='relative hidden w-[251px] rounded-[10px] border-[1px] border-solid border-gray-200 bg-white px-6 pt-[18px] pb-[18px] md:block lg:w-[340px]'
        style={{ boxShadow: '1px 2.5px 7px rgba(0, 0, 0, 0.1)' }}
      >
        <Reservation data={data} />
      </div>
    </>
  );
};
export default ReservateIn;
