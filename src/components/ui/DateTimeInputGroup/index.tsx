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
  const { control, setError, clearErrors } = useFormContext<DateTimeValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = (value: DateTimeValues['schedules'][number]) => {
    if (!value.date || !value.startTime || !value.endTime) {
      setError('schedules', {
        type: 'manual',
        message: '시간대를 하나 이상 추가해주세요.',
      });
      return;
    }
    append(value);
    clearErrors('schedules');
  };

  return (
    <>
      <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] text-left font-medium'>
        <div className='header-item'>날짜</div>
        <div className='header-item'>시작 시간</div>
        <div className='header-item'>종료 시간</div>
        <div className='header-item'></div>
      </div>

      <div className='grid-row col-span-3 grid grid-cols-4 gap-5'>
        <AddDateTimeItem onAdd={handleAdd} addedSchedules={fields} />

        {fields.map((field, i) => (
          <DateTimeItem key={field.id} index={i} value={field} onRemove={() => remove(i)} />
        ))}
      </div>
    </>
  );
};

export default DateTimeInputGroup;
