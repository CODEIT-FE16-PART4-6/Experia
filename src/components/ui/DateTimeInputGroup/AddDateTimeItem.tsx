import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  onAdd: (value: { date: string; startTime: string; endTime: string }) => void;
  addedSchedules: { date: string; startTime: string; endTime: string }[];
}

const AddDateTimeItem = ({ onAdd, addedSchedules }: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!date) {
      setError('날짜를 입력해주세요.');
      return;
    }
    if (!startTime) {
      setError('시작 시간을 입력해주세요.');
      return;
    }
    if (!endTime) {
      setError('종료 시간을 입력해주세요.');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
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
      setError('이미 등록된 시간대입니다.');
      return;
    }

    // 유효성 검사: 시작 시간 < 종료 시간
    if (startTime.getTime() >= endTime.getTime()) {
      setError('종료 시간이 시작 시간보다 빠릅니다.');
      return;
    }

    // 유효성 검사 후 항목 추가
    onAdd({ date: formattedDate, startTime: formattedStartTime, endTime: formattedEndTime });
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setError('');
  };

  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <DatePicker
        selected={date}
        onChange={(v: Date | null) => setDate(v)}
        placeholderText='yyyy-mm-dd'
        enableTabLoop={false}
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
      />

      <button
        type='button'
        onClick={handleAdd}
        className='bg-primary flex h-[56px] w-[56px] items-center justify-center rounded px-2 py-1 text-white'
      >
        +
      </button>

      {error && <p className='col-span-4 text-red-500'>{error}</p>}
    </div>
  );
};

export default AddDateTimeItem;
