import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';

interface Props {
  onAdd: (newItem: { date: string; startTime: string; endTime: string }) => void;
  addedSchedules: { date: string; startTime: string; endTime: string }[];
}

const AddDateTimeItem = ({ onAdd, addedSchedules }: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  // const [error, setError] = useState('');

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

    setDate(null);
    setStartTime(null);
    setEndTime(null);
    // setError('');
    clearErrors('schedules');
  };

  const errorMsg = errors.schedules?.message;
  const isGlobalError = typeof errorMsg === 'string' && errorMsg.includes('한 개 이상');
  const isDateError = typeof errorMsg === 'string' && errorMsg.includes('날짜');
  const isStartError = typeof errorMsg === 'string' && errorMsg.includes('시작');
  const isEndError = typeof errorMsg === 'string' && errorMsg.includes('종료');

  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <DatePicker
        selected={date}
        onChange={(v: Date | null) => setDate(v)}
        placeholderText='yyyy-mm-dd'
        enableTabLoop={false}
        className={`${isGlobalError || isDateError ? 'border-red-primary bg-red-100' : ''}`}
      />
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
      />
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
      />

      <button
        type='button'
        onClick={handleAdd}
        className='bg-primary flex h-[56px] w-[56px] items-center justify-center rounded px-2 py-1 text-white'
      >
        +
      </button>

      {typeof errorMsg === 'string' && <p className='col-span-4 text-red-500'>{errorMsg}</p>}
    </div>
  );
};

export default AddDateTimeItem;
