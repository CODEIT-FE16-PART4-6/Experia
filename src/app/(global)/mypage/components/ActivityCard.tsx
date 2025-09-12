import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import StarIcon from '@/assets/icons/ic_StarSmall.svg';
import Button from '@/components/Button';
import { DropdownMeatball } from '@/components/DropdownMeatball';
import DeleteModal from '@/components/activities/Modals/DeleteModal';
import ReviewCreateModal from '@/components/review/ReviewCreateModal';
import useModalStore from '@/stores/modalStore';
import { ActivityType } from '@/types/schema/activitiesSchema';
import { ReservationType } from '@/types/schema/reservationSchema';

interface ActivityCardProps {
  data: ReservationType | ActivityType;
  type: 'reservation' | 'activity';
  onDeleteSuccess?: () => void;
}
const RESERVATION_STATUS = {
  pending: '예약 신청',
  canceled: '예약 취소',
  confirmed: '예약 승인',
  declined: '예약 거절',
  completed: '체험 완료',
};
/**
 *
 * @returns 액티비티 1개 정보를 담고 있는 카드
 * @description my-activities, my-reservations 페이지에서 사용
 */
const ActivityCard = ({ data, type, onDeleteSuccess }: ActivityCardProps) => {
  const router = useRouter();
  const closeModal = useModalStore(state => state.closeModal);
  const openModal = useModalStore(state => state.openModal);

  if (type === 'reservation') {
    const reservation = data as ReservationType;

    return (
      <div className='flex h-auto w-full flex-wrap overflow-hidden rounded-2xl bg-white shadow-lg sm:h-[156px] sm:flex-nowrap lg:h-[204px]'>
        <figure className='relative aspect-square h-auto w-full shrink-0 sm:h-[156px] sm:w-[156px] lg:h-[204px] lg:w-[204px]'>
          <Image
            src={reservation.activity.bannerImageUrl}
            alt='액티비티 배너 사진'
            fill
            className='object-cover'
          />
        </figure>

        <div className='w-full p-3 lg:p-5'>
          <div className='flex flex-col lg:gap-2'>
            <span className='text-md font-bold lg:text-base'>
              {RESERVATION_STATUS[reservation.status]}
            </span>
            <h5 className='text-md w-[95%] truncate font-bold md:text-lg lg:text-xl'>
              {reservation.activity.title}
            </h5>
            <span className='md:text-md text-xs text-gray-800 lg:text-lg'>
              {reservation.date} · {reservation.startTime} - {reservation.endTime} ·
              {reservation.headCount}명
            </span>
          </div>

          <div className='mt-2 flex items-center justify-between md:mt-3.5'>
            <h4 className='text-base font-medium md:text-xl lg:text-2xl'>
              ₩{reservation.totalPrice}
            </h4>

            {reservation.status === 'pending' && (
              <Button size='sm' className='w-auto sm:px-2 sm:py-1 md:px-6 md:py-2 lg:px-[42px]'>
                예약 취소
              </Button>
            )}

            {reservation.status === 'completed' && (
              <Button
                size='sm'
                variant='POSITIVE'
                className='w-auto sm:px-2 sm:py-1 md:px-6 md:py-2 lg:px-[42px]'
                onClick={() => openModal(<ReviewCreateModal data={reservation} />)}
              >
                후기 작성
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  } else if (type === 'activity') {
    const activity = data as ActivityType;

    const handleDelete = () => {
      openModal(
        <DeleteModal
          activityId={data.id}
          title={activity.title}
          onClose={closeModal}
          onDeleteSuccess={onDeleteSuccess}
        />,
      );
    }; // 삭제하기 버튼 클릭시

    const handleEdit = () => {
      router.push(`/mypage/my-activities/edit-activity/${data.id}`);
    }; // 수정하기 버튼 클릭시

    return (
      <div className='relative'>
        <Link
          href={`/mypage/my-activities/edit-activity/${data.id}`}
          className='flex h-[128px] w-full overflow-hidden rounded-2xl shadow-lg md:h-[156px] lg:h-[204px]'
        >
          <div className='relative h-[128px] w-[128px] md:h-[156px] md:w-[156px] lg:h-[204px] lg:w-[204px]'>
            <figure>
              <Image
                src={activity.bannerImageUrl}
                alt='액티비티 배너 사진'
                fill
                className='object-cover'
              />
            </figure>
          </div>
          <div className='flex flex-col justify-between px-6 py-[14px]'>
            <div>
              <div className='flex'>
                <StarIcon />
                <div>{activity.rating}</div>
                <div>({activity.reviewCount})</div>
              </div>
              <div>{activity.title}</div>
            </div>
            <div className='flex justify-between'>
              <div>₩ {activity.price}/인</div>
            </div>
          </div>
        </Link>
        <div className='absolute right-[24px] bottom-[14px]'>
          <DropdownMeatball onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    );
  }
};
export default ActivityCard;
