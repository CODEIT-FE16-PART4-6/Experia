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

  //인원수 조정 핸들러
  const handleIncrease = () => {
    setPersonCount(personCount + 1);
  };

  const handleDecrease = () => {
    setPersonCount(prev => Math.max(prev - 1, 1));
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
          <div className='flex gap-5'>
            <p className='text-[20px] font-bold text-[#112211]'>
              ₩ {(personCount * data.price).toLocaleString('ko-KR')} /
              <span className='font-normal text-[#1c4d30]'> 총 {personCount}인</span>
            </p>
            <div className='flex flex-col justify-center text-[13px] font-semibold text-[#1c4d30]'>
              {selectedDate ? selectedDate.toLocaleDateString().replaceAll('.', '/') : ''}
              {mySchedule ? mySchedule : ''}
            </div>
          </div>
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
          <p className='font-gray-800 mt-[25px] text-[20px]'>예약할 인원을 선택해주세요.</p>
          <div
            className='mt-2 mb-6 flex h-10 w-[120px] justify-between overflow-hidden rounded-[7px] border-[1px] border-solid border-gray-400'
            style={{ boxShadow: '1px 2.5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <button className='px-[14px] hover:bg-gray-200' onClick={handleDecrease}>
              <Image
                src='/icons/ActivityPageImgs/ic_ReservationMinus.svg'
                alt='인원추가버튼'
                width='14'
                height='14'
              ></Image>
            </button>
            <p className='w-10 py-2 text-center text-gray-900'>{personCount}</p>
            <button className='px-[14px] hover:bg-gray-200' onClick={handleIncrease}>
              <Image
                src='/icons/ActivityPageImgs/ic_ReservationPlus.svg'
                alt='인원추가버튼'
                width='14'
                height='14'
              ></Image>
            </button>
          </div>
          <Button
            onClick={() => {
              setWhiteBox(false);
            }}
            className='mt-30 w-full'
          >
            확인
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReservateMobile;
