import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import styles from '@/app/(global)/activities/[id]/components/reservation-block/Reservation.module.css';
import clsx from 'clsx';

interface Props {
  onAdd: (newItem: { date: string; startTime: string; endTime: string }) => void;
  addedSchedules: { date: string; startTime: string; endTime: string }[];
}

const AddDateTimeItem = ({ onAdd, addedSchedules }: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleAdd = () => {
    if (!date) {
      setError('schedules', { message: '날짜를 입력해주세요.' });
      return;
    }
    if (!startTime) {
      setError('schedules', { message: '시작 시간을 입력해주세요.' });
      return;
    }
    if (!endTime) {
      setError('schedules', { message: '종료 시간을 입력해주세요.' });
      return;
    }

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // YYYY-MM-DD
    const formattedStartTime = startTime.toTimeString().slice(0, 5); // HH:mm
    const formattedEndTime = endTime.toTimeString().slice(0, 5); // HH:mm

    // 유효성 검사: 중복 시간 체크
    const duplicate = addedSchedules.some(
      schedule =>
        schedule.date === formattedDate &&
        schedule.startTime === formattedStartTime &&
        schedule.endTime === formattedEndTime,
    );
    if (duplicate) {
      setError('schedules', { message: '이미 등록된 시간대입니다.' });
      return;
    }

    // 유효성 검사: 시작 시간 < 종료 시간
    if (startTime.getTime() >= endTime.getTime()) {
      setError('schedules', { message: '종료 시간이 더 빠를 수 없습니다.' });
      return;
    }

    // date 기준 오름차순 정렬
    const newItem = {
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

    // 유효성 검사 후 항목 추가
    onAdd(newItem);

    clearErrors('schedules');
  };

  const errorMsg = errors.schedules?.message;
  const isGlobalError = typeof errorMsg === 'string' && errorMsg.includes('한 개 이상');
  const isDateError = typeof errorMsg === 'string' && errorMsg.includes('날짜');
  const isStartError = typeof errorMsg === 'string' && errorMsg.includes('시작');
  const isEndError = typeof errorMsg === 'string' && errorMsg.includes('종료');

  return (
    <div
      className={clsx('date-time-grid-layout', {
        'border border-x-0 border-t-0 border-b-gray-300 pb-3 md:pb-5': addedSchedules.length > 0,
      })}
    >
      <div className='relative w-full'>
        <DatePicker
          selected={date}
          onChange={(v: Date | null) => setDate(v)}
          placeholderText='yyyy-mm-dd'
          enableTabLoop={false}
          className={`${isGlobalError || isDateError ? 'border-red-primary bg-red-100' : ''}`}
          wrapperClassName={styles.datepicker}
          calendarClassName={styles.datepicker}
        />
        <span className='pointer-events-none absolute top-1/2 right-4 -translate-y-1/2'>
          <Image src='/icons/ic_Calendar.svg' alt='체험일자 선택' width={24} height={24} />
        </span>
      </div>

      <div className='relative w-[30%] grow sm:w-full sm:grow-0'>
        <DatePicker
          selected={startTime}
          onChange={(v: Date | null) => setStartTime(v)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat='HH:mm'
          timeIntervals={10} // 10분 간격
          dateFormat='HH:mm'
          placeholderText='00:00'
          enableTabLoop={false}
          className={`${isGlobalError || isStartError ? 'border-red-primary bg-red-100' : ''}`}
          wrapperClassName={styles.datepicker}
          calendarClassName={styles.datepicker}
          onCalendarOpen={() => setIsStartOpen(true)}
          onCalendarClose={() => setIsStartOpen(false)}
        />

        <span
          className={clsx(
            'absolute top-1/2 right-0 -translate-1/2 transition-transform',
            isStartOpen ? 'rotate-180' : '',
          )}
        >
          <Image src='/icons/ic_ArrowDownLine.svg' alt='시작 시간 선택' width={20} height={20} />
        </span>
      </div>

      <span className='self-center text-lg font-bold'>~</span>

      <div className='relative w-[30%] grow sm:w-full sm:grow-0'>
        <DatePicker
          selected={endTime}
          onChange={(v: Date | null) => setEndTime(v)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat='HH:mm'
          timeIntervals={10}
          dateFormat='HH:mm'
          placeholderText='00:00'
          enableTabLoop={false}
          className={`${isGlobalError || isEndError ? 'border-red-primary bg-red-100' : ''}`}
          wrapperClassName={styles.datepicker}
          calendarClassName={styles.datepicker}
          onCalendarOpen={() => setIsEndOpen(true)}
          onCalendarClose={() => setIsEndOpen(false)}
        />

        <span
          className={clsx(
            'absolute top-1/2 right-0 -translate-1/2 transition-transform',
            isEndOpen ? 'rotate-180' : '',
          )}
        >
          <Image src='/icons/ic_ArrowDownLine.svg' alt='종료 시간 선택' width={20} height={20} />
        </span>
      </div>

      <button
        type='button'
        aria-label='예약 시간대 추가 버튼'
        onClick={handleAdd}
        className='bg-primary hover:bg-primary-dark flex h-[56px] w-[56px] items-center justify-center rounded-lg px-2 py-1 text-white transition-colors'
      >
        <Image src='/icons/ic_Plus.svg' alt='' width={24} height={24} />
      </button>

      {typeof errorMsg === 'string' && <p className='col-span-4 text-red-500'>{errorMsg}</p>}
    </div>
  );
};

export default AddDateTimeItem;
