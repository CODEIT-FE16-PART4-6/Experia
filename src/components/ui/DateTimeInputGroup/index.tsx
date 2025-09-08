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
  const { control, setError, clearErrors, setValue, getValues } = useFormContext<DateTimeValues>();
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

    const currentSchedules = getValues(name) || []; // 리액트 훅폼에 등록한 커스텀 필드 'schedules' 가져오기
    const newSchedules = [...currentSchedules, value];

    // 시간대 오름차순 정렬
    newSchedules.sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.startTime < b.startTime ? -1 : 1;
    });

    // 정렬한 시간대를 훅폼 form state에 적용
    setValue(name, newSchedules);

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
          <DateTimeItem key={field.id} value={field} onRemove={() => remove(i)} />
        ))}
      </div>
    </>
  );
};

export default DateTimeInputGroup;
