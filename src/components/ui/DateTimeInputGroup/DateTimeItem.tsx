import { useFormContext } from 'react-hook-form';

interface Props {
  index: number;
  value: { date: string; startTime: string; endTime: string };
  onRemove: () => void;
}

const DateTimeItem = ({ index, value, onRemove }: Props) => {
  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <input type='date' readOnly value={value.date} className='border p-1' />
      <input type='time' readOnly value={value.startTime} className='border p-1' />
      <input type='time' readOnly value={value.endTime} className='border p-1' />

      <button
        type='button'
        onClick={onRemove}
        className='flex h-[56px] w-[56px] items-center justify-center rounded bg-white px-2 py-1 text-black'
      >
        -
      </button>
    </div>
  );
};

export default DateTimeItem;
