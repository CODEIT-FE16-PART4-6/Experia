import { useFormContext } from 'react-hook-form';

interface Props {
  index: number;
  onRemove: () => void;
  register: any;
  name: string;
  error?: any;
}

const DateTimeItem = ({ index, onRemove, register, name, error }: Props) => {
  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <input type='date' {...register(`${name}.${index}.date`)} className='border p-1' />
      <input type='time' {...register(`${name}.${index}.startTime`)} className='border p-1' />
      <input type='time' {...register(`${name}.${index}.endTime`)} className='border p-1' />

      <button
        type='button'
        onClick={onRemove}
        className='flex h-[56px] w-[56px] items-center justify-center rounded bg-white px-2 py-1 text-black'
      >
        -
      </button>

      {error && <p className='text-red-500'>{error.message}</p>}
    </div>
  );
};

export default DateTimeItem;
