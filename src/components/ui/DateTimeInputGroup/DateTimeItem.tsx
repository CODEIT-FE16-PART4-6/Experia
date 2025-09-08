import Image from 'next/image';
interface Props {
  value: { date: string; startTime: string; endTime: string };
  onRemove: () => void;
}

const DateTimeItem = ({ value, onRemove }: Props) => {
  return (
    <div className='col-span-4 grid grid-cols-[2fr_1fr_1fr_56px] gap-5'>
      <input type='date' readOnly value={value.date} className='border p-1' />
      <input type='time' readOnly value={value.startTime} className='border p-1' />
      <input type='time' readOnly value={value.endTime} className='border p-1' />

      <button
        type='button'
        onClick={onRemove}
        className='flex h-[56px] w-[56px] items-center justify-center rounded-lg border border-gray-300 bg-white text-black transition-colors hover:bg-gray-100'
      >
        <Image src='/icons/ic_Minus.svg' alt='' width={24} height={24} />
      </button>
    </div>
  );
};

export default DateTimeItem;
