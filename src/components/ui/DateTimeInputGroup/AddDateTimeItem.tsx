import { useState } from 'react';

interface Props {
  onAdd: (value: { date: string; startTime: string; endTime: string }) => void;
  addedSchedules: { date: string; startTime: string; endTime: string }[];
}

const AddDateTimeItem = ({ onAdd, addedSchedules }: Props) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    // 폼 제출 전, 각 항목 유효성 별도 검사
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

    // 중복 시간 체크
    const duplicate = addedSchedules.some(
      schedule =>
        schedule.date === date && schedule.startTime === startTime && schedule.endTime === endTime,
    );
    if (duplicate) {
      setError('이미 등록된 시간대입니다.');
      return;
    }

    // 유효성 검사, 중복 체크 후 항목 추가
    onAdd({ date, startTime, endTime });
    setDate('');
    setStartTime('');
    setEndTime('');
    setError('');
  };

  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <input
        type='date'
        value={date}
        onChange={e => setDate(e.target.value)}
        className='border p-1'
      />
      <input
        type='time'
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        className='border p-1'
      />
      <input
        type='time'
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        className='border p-1'
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
