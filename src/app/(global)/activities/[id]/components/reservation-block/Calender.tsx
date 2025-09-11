import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';

//style
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/styles/datepicker.module.css';
import { ActivityDetail } from '@/types/schema/activitiesSchema';

//schema

type DateType = ActivityDetail['schedules'][number]['date'];
// ActivityDetail 타입에서 scheduleId 타입 추출
type ScheduleIdType = ActivityDetail['schedules'][number]['id'];
//선택된 날짜의 schedules 필터링

interface Props {
  data: ActivityDetail;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedScheduleId: React.Dispatch<React.SetStateAction<ScheduleIdType>>;
  setMySchedule: React.Dispatch<React.SetStateAction<string | null>>;
}

const Calander = ({
  data,
  selectedDate,
  setSelectedDate,
  setSelectedScheduleId,
  setMySchedule,
}: Props) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  // 스케줄 있는 날짜들 Date 객체로 변환하여 저장
  const highlightDates = useMemo(() => {
    return data.schedules.map(schedule => {
      const date = new Date(schedule.date);
      return date;
    });
  }, [data.schedules]);
  const convertToDate = (dateString: DateType): Date | null => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

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

      // 선택된 날짜와 일치하는지 확인
      if (scheduleDateTime.getTime() !== selectedDate.getTime()) {
        return false;
      }

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
    setSelectedButton(null); //선택된 시간대 버튼도 초기화
    setMySchedule(null); //선택된 시간대 문자열도 초기화
  };

  //스케줄 선택 핸들러(schedules.Id 저장)
  const handleSelectSchedule = (
    scheduleId: ScheduleIdType,
    index: number,
    scheduleStart: string,
    scheduleEnd: string,
  ) => {
    setSelectedScheduleId(scheduleId);
    setSelectedButton(index);
    const mySchedule = `${scheduleStart}~${scheduleEnd}`;
    setMySchedule(mySchedule);
  };

  return (
    <>
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
          dayClassName={date => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 오늘 0시 기준

            const isPast = date < today;
            const isHighlighted = highlightDates.some(
              highlightDate => date.toDateString() === highlightDate.toDateString(),
            );

            return isPast && isHighlighted ? 'past-highlight' : '';
          }}
        />
      </div>
      <p className='text-nomad-black mb-[14px] pt-6 text-[18px] font-bold sm:block md:hidden'>
        예약 가능한 시간
      </p>
      {selectedDate ? (
        <div>
          {selectedDateSchedules.length > 0 ? (
            <>
              <p className='text-nomad-black mt-4 mb-[14px] hidden text-[18px] font-bold sm:hidden md:block'>
                예약 가능한 시간
              </p>
              <div className='flex flex-wrap gap-3'>
                {selectedDateSchedules.map((schedule, index) => (
                  <button
                    className={`${selectedButton === index ? 'bg-nomad-black text-white' : 'text-nomad-black bg-white hover:bg-[#105844] hover:text-white'} rounded-[7px] border-1 border-solid px-3 py-[10px]`}
                    key={schedule.id}
                    onClick={() =>
                      handleSelectSchedule(schedule.id, index, schedule.startTime, schedule.endTime)
                    }
                  >
                    {schedule.startTime}~{schedule.endTime}
                  </button> //날짜 선택시 나오는 선택가능한 시간대들
                ))}
              </div>
              <hr className='mt-3 hidden border-gray-300 lg:block' />
            </>
          ) : (
            <p className='mt-6 mb-8 flex justify-center text-gray-600'>
              예약 가능한 시간이 없습니다.
            </p>
          )}
        </div>
      ) : (
        <div className='mt-6 mb-8 flex justify-center text-gray-600'>날짜를 선택해주세요.</div>
      )}
    </>
  );
};

export default Calander;
