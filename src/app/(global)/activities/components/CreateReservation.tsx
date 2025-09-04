'use client';
import DatePicker from 'react-datepicker';
import { useState, useMemo } from 'react';
import { ActivityDetail } from '@/types/schema/activitiesSchema';
import 'react-datepicker/dist/react-datepicker.css';
import apiAuth from '@/utils/axios/apiAuth';
import { ReservationRequest } from '@/types/schema/reservationSchema';
import { ko } from 'date-fns/locale';
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

  // 스케줄 있는 날짜들 Date 객체로 변환하여 저장
  const highlightDates = useMemo(() => {
    return data.schedules.map(schedule => {
      const date = new Date(schedule.date);
      return date;
    });
  }, [data.schedules]);
  //TODO . React DevTools로 컴포넌트 렌더링 시간을 측정하고, useMemo 사용 전후를 비교하기
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
  const handleSelectSchedule = (scheduleId: ScheduleIdType) => {
    setSelectedScheduleId(scheduleId);
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
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={date => handleSelectDate(date)}
          dateFormat={'yyyy-MM-dd'}
          inline //달력모양 보여주기 기본값:input
          locale={ko} //기본은 영어예용. 한국어로
          highlightDates={highlightDates} //선택가능한날짜 하이라이트
          minDate={new Date()} //오늘이전선택불가
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
