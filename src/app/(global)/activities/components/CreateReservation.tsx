'use client';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
import 'react-datepicker/dist/react-datepicker.css';
import apiAuth from '@/utils/axios/apiAuth';
import { ReservationRequest } from '@/types/schema/reservationSchema';

interface Props {
  data: ActivityDetail;
}

const CreateReservation = ({ data }: Props) => {
  // ActivityDetail 타입에서 date 타입 추출
  type DateType = ActivityDetail['schedules'][number]['date'];
  // ActivityDetail 타입에서 scheduleId 타입 추출
  type ScheduleIdType = ActivityDetail['schedules'][number]['id'];
  //선택된 날짜의 schedules 필터링
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [personCount, setPersonCount] = useState(1);
  const [selectedSchedule, setSelectedScheduleId] = useState<ScheduleIdType>(0);

  //날짜 선택 핸들러
  const handleSelectDate = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedScheduleId(0); //날짜 변경시 시간대 스케줄도 초기화
  };

  const convertToDate = (dateString: DateType): Date | null => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  // 선택된 날짜의 schedules 필터링
  const selectedDateSchedules = data.schedules.filter(schedule => {
    // schedule.date(string)를 Date 객체로 변환
    const scheduleDate = convertToDate(schedule.date);
    // 유효한 Date 객체인지 확인하고, selectedDate와 비교
    return (
      scheduleDate &&
      selectedDate &&
      scheduleDate.getFullYear() === selectedDate.getFullYear() &&
      scheduleDate.getMonth() === selectedDate.getMonth() &&
      scheduleDate.getDate() === selectedDate.getDate()
    );
  });

  //스케줄 선택 핸들러(schedules.Id 저장)
  const handleSelectSchedule = (scheduleId: ScheduleIdType) => {
    setSelectedScheduleId(scheduleId);
  };

  //인원수 조정 핸들러
  const handleIncrease = () => {
    setPersonCount(personCount + 1);
  };

  const handleDecrease = () => {
    setPersonCount(personCount - 1);
    if (personCount <= 1) {
      setPersonCount(1); //1명 이하로는 감소 불가
    }
  };

  //예약하기 함수
  const handleReservation = async () => {
    if (!selectedSchedule && !selectedDate) {
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
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={date => handleSelectDate(date)}
          dateFormat={'yyyy-MM-dd'}
        />
      </div>
      {selectedDate && (
        <div>
          {selectedDateSchedules.map(schedule => (
            <button key={schedule.id} onClick={() => handleSelectSchedule(schedule.id)}>
              {schedule.startTime}~{schedule.endTime}
            </button> //날짜 선택시 나오는 선택가능한 시간대들
          ))}
        </div>
      )}
      <div>
        <button onClick={handleDecrease}>-</button>
        <span>{personCount}명</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <button disabled={!selectedSchedule} onClick={handleReservation}>
        예약하기
      </button>
    </section>
  );
};

export default CreateReservation;
