import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import StarIcon from '@/assets/icons/ic_StarSmall.svg';
import Button from '@/components/Button';
import { DropdownMeatball } from '@/components/DropdownMeatball';
import DeleteModal from '@/components/activities/Modals/DeleteModal';
import ReviewCreateModal from '@/components/review/ReviewCreateModal';
import useModalStore from '@/stores/modalStore';
import { ActivityType } from '@/types/schema/activitiesSchema';
import { ReservationType } from '@/types/schema/reservationSchema';
import { cancelReservation } from '@/utils/api-public/api-reservations.api';
import formatPrice from '@/utils/formatter/formatPrice';
import formatRating from '@/utils/formatter/formatRating';

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
  const [isCanceling, setIsCanceling] = useState(false);

  if (type === 'reservation') {
    const reservation = data as ReservationType;

    const handleCancelReservation = async () => {
      if (isCanceling) return;

      setIsCanceling(true);
      try {
        await cancelReservation(reservation.id);

        alert('예약이 취소되었습니다.');
        // 목록 새로고침을 위해 부모 컴포넌트의 콜백 호출
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } catch (error) {
        console.error('예약 취소 중 오류 발생:', error);
        const errorMessage = error instanceof Error ? error.message : '예약 취소에 실패했습니다.';
        alert(errorMessage);
      } finally {
        setIsCanceling(false);
      }
    };

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

        <div className='flex w-full min-w-0 flex-col items-start justify-between overflow-hidden p-4 lg:p-6'>
          <div className='flex w-full min-w-0 flex-col lg:gap-2'>
            <span className='text-md font-bold lg:text-base'>
              {RESERVATION_STATUS[reservation.status]}
            </span>
            <h5 className='my-1 w-[95%] truncate text-lg font-bold md:my-0 lg:text-xl'>
              {reservation.activity.title}
            </h5>
            <span className='md:text-md text-xs text-gray-800 lg:text-lg'>
              {reservation.date} · {reservation.startTime} - {reservation.endTime} ·
              {reservation.headCount}명
            </span>
          </div>

          <div className='mt-6 flex w-full items-center justify-between md:mt-3.5'>
            <h4 className='text-2xl font-bold'>₩ {formatPrice(reservation.totalPrice)}</h4>

            {reservation.status === 'pending' && (
              <Button
                size='sm'
                className='w-auto sm:px-2 sm:py-1 md:px-6 md:py-2 lg:px-[42px]'
                onClick={handleCancelReservation}
                disabled={isCanceling}
              >
                {isCanceling ? '취소 중...' : '예약 취소'}
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
          className='flex w-full flex-wrap overflow-hidden rounded-2xl shadow-lg sm:flex-nowrap'
        >
          <figure className='relative aspect-square h-auto w-full shrink-0 sm:h-[156px] sm:w-[156px] lg:h-[204px] lg:w-[204px]'>
            <Image
              src={activity.bannerImageUrl}
              alt='액티비티 배너 사진'
              fill
              className='object-cover'
            />
          </figure>

          <div className='flex w-full min-w-0 flex-col justify-between overflow-hidden p-4 lg:p-6'>
            <div className='flex flex-col gap-0 md:gap-2'>
              <div className='flex items-center gap-1'>
                <StarIcon />
                <span>{formatRating(activity.rating)}</span>
                <span className='text-gray-500'>({activity.reviewCount})</span>
              </div>
              <h5 className='my-1 w-[85%] truncate text-lg font-bold md:my-0 lg:text-xl'>
                {activity.title}
              </h5>
            </div>

            <h3 className='mt-6 flex items-center gap-2 text-2xl font-bold md:mt-0'>
              ₩ {formatPrice(activity.price)}{' '}
              <span className='text-lg font-normal text-gray-500'>/ 인</span>
            </h3>
          </div>
        </Link>

        <div className='absolute top-[24px] right-[20px]'>
          <DropdownMeatball onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    );
  }
};
export default ActivityCard;
