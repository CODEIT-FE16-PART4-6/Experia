'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useState, useMemo } from 'react';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
import 'react-datepicker/dist/react-datepicker.css';
import apiAuth from '@/utils/axios/apiAuth';
import { ReservationRequest } from '@/types/schema/reservationSchema';
// import { ko } from 'date-fns/locale'; // 시안에는 영어라서 뺌.
import Calander from './Calander';

interface Props {
  data: ActivityDetail;
}

const Reservation = ({ data }: Props) => {
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

  // 스케줄 있는 날짜들 Date 객체로 변환하여 저장
  const highlightDates = useMemo(() => {
    return data.schedules.map(schedule => {
      const date = new Date(schedule.date);
      return date;
    });
  }, [data.schedules]);
  //TODO [P6-127] . React DevTools로 컴포넌트 렌더링 시간을 측정하고, useMemo 사용 전후를 비교하기
  //const highlightDates = data.schedules.map(schedule => new Date(schedule.date))

  //인원수 조정 핸들러
  const handleIncrease = () => {
    setPersonCount(personCount + 1);
  };

  const handleDecrease = () => {
    setPersonCount(prev => Math.max(prev - 1, 1));
  };

  const handleWhiteBox = () => {
    setWhiteBox(true);
  };

  //예약하기 함수
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
    <section>
      <div className='mb-2 font-bold md:text-[24px] lg:text-[32px]'>
        ₩ {data.price.toLocaleString('ko-KR')}
        <span className='font-normal text-gray-800 md:text-[16px] lg:text-[20px]'> / 인</span>
      </div>
      <hr className='border-gray-300 md:mx-[-1.5rem] lg:mx-0' />
      <p className='text-nomad-black text-[20px] font-bold md:mt-[13px] md:mb-[7px] lg:my-[14px]'>
        날짜
      </p>
      <div className='font-bold md:mb-[10px] md:block lg:hidden'>
        {selectedDate ? selectedDate.toLocaleDateString().replaceAll('.', '/') : ''}{' '}
        {mySchedule ? mySchedule : ''}
      </div>
      <div className='md:hidden lg:block'>
        <Calander
          data={data}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSchedule={selectedSchedule}
          setSelectedScheduleId={setSelectedScheduleId}
          setMySchedule={setMySchedule}
        />
      </div>
      <button
        className='text-nomad-black mb-[27px] font-semibold md:block lg:hidden'
        onClick={handleWhiteBox}
      >
        날짜 선택하기
      </button>
      {whiteBox && (
        <div className='absolute top-0 right-0 rounded-[10px] bg-white p-6 pt-7 pr-6 pb-8 pl-6 shadow'>
          <div className='flex w-[432px] justify-between'>
            <p className='text-[24px] font-bold'>날짜</p>
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
          <Button
            onClick={() => {
              setWhiteBox(false);
            }}
            className='mt-10'
          >
            확인
          </Button>
        </div>
      )}
      <p className='text-nomad-black mt-4 font-bold md:text-[20px] lg:text-[18px]'>참여 인원 수</p>
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
        className='h-14 border-gray-400 hover:border-none disabled:border-gray-100 disabled:text-white'
        disabled={!selectedSchedule}
        onClick={handleReservation}
      >
        {selectedSchedule ? '예약하기' : '일정을 선택해 주세요'}
      </Button>
      <hr className='mt-6 mb-4 border-gray-300 md:mx-[-1.5rem] lg:mx-0' />
      <div className='text-nomad-black flex justify-between text-[20px] font-bold'>
        <span>총 합계</span>
        <div> ₩ {(data.price * personCount).toLocaleString('ko-KR')}</div>
      </div>
    </section>
  );
};

export default Reservation;
