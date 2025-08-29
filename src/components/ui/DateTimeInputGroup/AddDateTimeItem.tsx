import { useFormContext } from 'react-hook-form';
import TimePicker from '../TimePicker';

interface Props {
  name: string;
  register: any;
  onAdd: () => void;
}

const AddDateTimeItem = ({ name, register, onAdd }: Props) => {
  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <input type='date' id='date' {...register(`${name}.0.date`)} className='border p-1' />
      <input type='time' {...register(`${name}.0.startTime`)} className='border p-1' />
      <input type='time' {...register(`${name}.0.endTime`)} className='border p-1' />

      <button
        type='button'
        onClick={onAdd}
        className='bg-primary flex h-[56px] w-[56px] items-center justify-center rounded px-2 py-1 text-white'
      >
        +
      </button>
    </div>
  );
};

export default AddDateTimeItem;
