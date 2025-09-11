import { useFormContext, useFieldArray } from 'react-hook-form';

import AddDateTimeItem from './AddDateTimeItem';
import DateTimeItem from './DateTimeItem';

interface Props {
  name: 'schedules'; // RHF field name
}

interface DateTimeValues {
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

const DateTimeInputGroup = ({ name }: Props) => {
  const { control, setError, clearErrors, getValues, setValue } = useFormContext<DateTimeValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = (value: DateTimeValues['schedules'][number]) => {
    if (!value.date || !value.startTime || !value.endTime) {
      setError(name, {
        type: 'manual',
        message: '시간대를 하나 이상 추가해주세요.',
      });
      return;
    }

    const currentSchedules = getValues(name) || []; // 리액트 훅폼에 등록한 커스텀 필드 'schedules' 가져오기
    const newSchedules = [...currentSchedules, value];

    // 시간대 오름차순 정렬
    newSchedules.sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.startTime < b.startTime ? -1 : 1;
    });

    // 1) 단일 항목 추가
    append(value);

    // 2) 정렬
    const updatedSchedules = [...getValues(name)];
    updatedSchedules.sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.startTime < b.startTime ? -1 : 1;
    });

    // 3) 정렬된 배열로 훅폼 값 업데이트
    setValue(name, updatedSchedules);

    clearErrors(name);
  };

  return (
    <>
      <div className='date-time-grid-header-layout'>
        <div className='header-item'>날짜</div>
        <div className='header-item'>시작 시간 (24시)</div>
        <div className='header-item'></div>
        <div className='header-item'>종료 시간 (24시)</div>
        <div className='header-item'></div>
      </div>

      <AddDateTimeItem onAdd={handleAdd} addedSchedules={fields} />

      <h6 className='mt-2 font-semibold sm:hidden'>등록된 예약 시간대</h6>

      {fields.map((field, i) => (
        <DateTimeItem key={field.id} value={field} onRemove={() => remove(i)} />
      ))}
    </>
  );
};

export default DateTimeInputGroup;
