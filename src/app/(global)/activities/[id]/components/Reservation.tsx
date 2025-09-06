'use client';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import Button from '@/components/Button';
import { useState, useMemo } from 'react';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
import 'react-datepicker/dist/react-datepicker.css';
import apiAuth from '@/utils/axios/apiAuth';
import { ReservationRequest } from '@/types/schema/reservationSchema';
import { ko } from 'date-fns/locale';
import styles from './Reservation.module.css';
interface Props {
  data: ActivityDetail;
}

const Reservation = ({ data }: Props) => {
  // ActivityDetail 타입에서 date 타입 추출
  type DateType = ActivityDetail['schedules'][number]['date'];
  // ActivityDetail 타입에서 scheduleId 타입 추출
  type ScheduleIdType = ActivityDetail['schedules'][number]['id'];
  //선택된 날짜의 schedules 필터링
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [personCount, setPersonCount] = useState(1);
  const [selectedSchedule, setSelectedScheduleId] = useState<ScheduleIdType>(0);
  const [selectedButton, setSelectedButton] = useState(null);

  // 스케줄 있는 날짜들 Date 객체로 변환하여 저장
  const highlightDates = useMemo(() => {
    return data.schedules.map(schedule => {
      const date = new Date(schedule.date);
      return date;
    });
  }, [data.schedules]);
  //TODO [P6-127] . React DevTools로 컴포넌트 렌더링 시간을 측정하고, useMemo 사용 전후를 비교하기
  //const highlightDates = data.schedules.map(schedule => new Date(schedule.date))

  //DateType(string)을 Date 객체로 변환하는 함수
  const convertToDate = (dateString: DateType): Date | null => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }; //TODO [P6-124] 테스트 코드 작성

  // 선택된 날짜의 schedules 필터링
  const selectedDateSchedules = useMemo(() => {
    if (!selectedDate) return [];

    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    return data.schedules.filter(schedule => {
      const scheduleDate = convertToDate(schedule.date);

      if (!scheduleDate) return false;

      const scheduleDateTime = new Date(
        scheduleDate.getFullYear(),
        scheduleDate.getMonth(),
        scheduleDate.getDate(),
      );

      //오늘 이전 날짜 제외
      if (scheduleDateTime < today) return false;
      //TODO [P6-123] 오늘날짜인데 시간대가 모두 지났을 경우 처리
      //오늘 날짜인 경우, 현재 시간 이전의 스케줄 제외
      if (scheduleDateTime.getTime() === today.getTime()) {
        const [hours, minutes] = schedule.startTime.split(':').map(Number);
        const scheduleTime = new Date(
          scheduleDate.getFullYear(),
          scheduleDate.getMonth(),
          scheduleDate.getDate(),
          hours,
          minutes,
        );

        if (scheduleTime <= currentDate) {
          return false;
        }
      }

      return true;
    });
  }, [data.schedules, selectedDate]);

  //날짜 선택 핸들러
  const handleSelectDate = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedScheduleId(0); //날짜 변경시 시간대 스케줄도 초기화
  };

  //스케줄 선택 핸들러(schedules.Id 저장)
  const handleSelectSchedule = (scheduleId: ScheduleIdType, index: any) => {
    setSelectedScheduleId(scheduleId);
    setSelectedButton(index);
  };

  //인원수 조정 핸들러
  const handleIncrease = () => {
    setPersonCount(personCount + 1);
  };

  const handleDecrease = () => {
    setPersonCount(prev => Math.max(prev - 1, 1));
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
      <div className='md:hidden lg:block'>
        <div className='flex justify-center gap-1'>
          <DatePicker
            selected={selectedDate}
            onChange={date => handleSelectDate(date)}
            dateFormat={'yyyy-MM-dd'}
            formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
            inline //달력모양 보여주기 기본값:input
            highlightDates={highlightDates} //선택가능한날짜 하이라이트
            minDate={new Date()} //오늘이전선택불가
            wrapperClassName={styles.datepicker}
            calendarClassName={styles.datepicker}
          />
        </div>
        {selectedDate && (
          <div>
            {selectedDateSchedules ? (
              <>
                <p className='text-nomad-black mt-4 mb-[14px] text-[18px] font-bold'>
                  예약 가능한 시간
                </p>
                <div className='flex gap-3'>
                  {selectedDateSchedules.map((schedule, index) => (
                    <button
                      className={`${selectedButton === index ? 'bg-nomad-black text-white' : 'text-nomad-black bg-white'} rounded-[7px] border-1 border-solid px-3 py-[10px]`}
                      key={schedule.id}
                      onClick={() => handleSelectSchedule(schedule.id, index)}
                    >
                      {schedule.startTime}~{schedule.endTime}
                    </button> //날짜 선택시 나오는 선택가능한 시간대들
                  ))}
                </div>
                <hr className='mt-3 hidden border-gray-300 lg:block' />
              </>
            ) : (
              <span>예약 가능한 시간이 없습니다.</span>
            )}
          </div>
        )}
      </div>
      <p className='text-nomad-black mt-4 text-[18px] font-bold'>참여 인원 수</p>
      <div
        className='mt-2 mb-6 flex h-10 w-[120px] justify-between overflow-hidden rounded-[7px] border-[1px] border-solid border-gray-400'
        style={{ boxShadow: '1px 2.5px 10px rgba(0, 0, 0, 0.1)' }}
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
