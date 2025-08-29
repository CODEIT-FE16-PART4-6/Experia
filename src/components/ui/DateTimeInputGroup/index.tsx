import { useFormContext, useFieldArray } from 'react-hook-form';
import AddDateTimeItem from './AddDateTimeItem';

const DateTimeInputGroup = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dateTimes',
  });

  return (
    <div className='grid grid-cols-3 gap-5'>
      <div className='grid-header col-span-3 grid grid-cols-3 text-left font-medium'>
        <div className='header-item'>날짜</div>
        <div className='header-item'>시작 시간</div>
        <div className='header-item'>종료 시간</div>
      </div>

      <div className='grid-row col-span-3 flex flex-col gap-2'>
        {fields.map((field, i) => (
          <AddDateTimeItem
            key={field.id}
            index={i}
            onAdd={() => append({ date: '', startTime: '', endTime: '' })}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default DateTimeInputGroup;
