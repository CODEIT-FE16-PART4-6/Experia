import { useFormContext } from 'react-hook-form';

type Props = {
  index: number;
  onAdd: () => void;
  onRemove: () => void;
};

const AddDateTimeItem = ({ index, onAdd, onRemove }: Props) => {
  const { register } = useFormContext();

  return (
    <div className='flex items-center gap-2'>
      <input type='date' {...register(`dateTimes.${index}.date` as const)} className='border p-1' />
      <input
        type='time'
        {...register(`dateTimes.${index}.startTime` as const)}
        className='border p-1'
      />
      <input
        type='time'
        {...register(`dateTimes.${index}.endTime` as const)}
        className='border p-1'
      />

      <button type='button' onClick={onAdd} className='rounded bg-blue-500 px-2 py-1 text-white'>
        + 추가
      </button>
      <button type='button' onClick={onRemove} className='rounded bg-red-500 px-2 py-1 text-white'>
        삭제
      </button>
    </div>
  );
};

export default AddDateTimeItem;
