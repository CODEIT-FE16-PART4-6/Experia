import { useFormContext, useFieldArray, useController } from 'react-hook-form';
import AddDateTimeItem from './AddDateTimeItem';
import DateTimeItem from './DateTimeItem';

interface Props {
  name: 'schedules'; // RHF fieldArray 이름
}

interface DateTimeValues {
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

const DateTimeInputGroup = ({ name }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<DateTimeValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] text-left font-medium'>
        <div className='header-item'>날짜</div>
        <div className='header-item'>시작 시간</div>
        <div className='header-item'>종료 시간</div>
        <div className='header-item'></div>
      </div>

      <div className='grid-row col-span-3 grid grid-cols-4 gap-5'>
        <AddDateTimeItem
          onAdd={() => append({ date: '', startTime: '', endTime: '' })}
          register={register}
          name={name}
        />
        {fields.map((field, i) => (
          <DateTimeItem
            key={field.id}
            index={i}
            onRemove={() => remove(i)}
            register={register}
            name={name}
            error={errors.schedules?.[i]}
          />
        ))}
      </div>
    </>
  );
};

export default DateTimeInputGroup;
