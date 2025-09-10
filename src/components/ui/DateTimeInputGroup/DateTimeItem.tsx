import Image from 'next/image';
interface Props {
  value: { date: string; startTime: string; endTime: string };
  onRemove: () => void;
}

const DateTimeItem = ({ value, onRemove }: Props) => {
  return (
    <div className='date-time-list-grid-layout'>
      <input
        type='text'
        readOnly
        value={value.date}
        className='text-primary pointer-events-none border-gray-300 bg-white p-3.5 font-medium shadow-sm'
      />

      <input
        type='text'
        readOnly
        value={value.startTime}
        className='text-primary pointer-events-none w-[30%] grow border-gray-300 bg-white p-3.5 font-medium shadow-sm sm:w-full sm:grow-0'
      />

      <span className='self-center text-lg font-bold'>~</span>

      <input
        type='text'
        readOnly
        value={value.endTime}
        className='text-primary pointer-events-none w-[30%] grow border-gray-300 bg-white p-3.5 font-medium shadow-sm sm:w-full sm:grow-0'
      />

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
