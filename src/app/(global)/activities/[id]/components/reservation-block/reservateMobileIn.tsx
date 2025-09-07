'use client';

//hook
import { useState } from 'react';
//comp
import Button from '@/components/Button';
import Calander from './Calander';
//util
import apiAuth from '@/utils/axios/apiAuth';
import Image from 'next/image';
//shema
import { ReservationRequest } from '@/types/schema/reservationSchema';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
interface Props {
  data: ActivityDetail;
}

const ReservateMobile = ({ data }: Props) => {
  // ActivityDetail 타입에서 date 타입 추출
  type DateType = ActivityDetail['schedules'][number]['date'];
  // ActivityDetail 타입에서 scheduleId 타입 추출
  type ScheduleIdType = ActivityDetail['schedules'][number]['id'];
  //선택된 날짜의 schedules 필터링
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [personCount, setPersonCount] = useState(1);
  const [selectedSchedule, setSelectedScheduleId] = useState<ScheduleIdType>(0);
  //const [selectedButton, setSelectedButton] = useState(null);
  const [whiteBox, setWhiteBox] = useState(false);
  const [mySchedule, setMySchedule] = useState<string | null>(null);

  const handleWhiteBox = () => {
    setWhiteBox(true);
  };

  const handleReservation = async () => {
    if (!selectedSchedule || !selectedDate) {
      alert('날짜와 시간을 선택해주세요');
      return;
    }

    const requestBody: ReservationRequest = {
      scheduleId: selectedSchedule,
      headCount: personCount,
    };

    try {
      const response = await apiAuth.post(`/activities/${data.id}/reservations`, requestBody);
      if (response.status === 201) {
        alert('예약이 완료되었습니다.');
      }
    } catch (error) {
      console.error('예약 생성 실패:', error);
      alert('예약 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <div className='flex justify-between p-4'>
        <div>
          <p className='text-[20px] font-bold text-[#112211]'>
            ₩ {data.price.toLocaleString('ko-KR')} /{' '}
            <span className='font-normal'>{personCount}명</span>
          </p>
          <button className='font-bold text-[#1c4d30] underline' onClick={handleWhiteBox}>
            날짜 선택하기
          </button>
        </div>
        <Button
          className='h-[48px] w-[106px] disabled:border-gray-100 disabled:text-white'
          disabled={!selectedSchedule}
          onClick={handleReservation}
        >
          예약하기
        </Button>
      </div>
      {whiteBox && (
        <div className='fixed inset-0 top-[70px] z-100 bg-white px-6 py-6'>
          <div className='mb-8 flex justify-between'>
            <p className='text-[28px] font-bold'>날짜</p>
            <button
              onClick={() => {
                setWhiteBox(false);
              }}
            >
              <Image
                src='/icons/ActivityPageImgs/ic_CloseButton.svg'
                alt='닫기 버튼'
                width={40}
                height={40}
              />
            </button>
          </div>

          <Calander
            data={data}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSchedule={selectedSchedule}
            setSelectedScheduleId={setSelectedScheduleId}
            setMySchedule={setMySchedule}
          />
        </div>
      )}
    </div>
  );
};

export default ReservateMobile;
