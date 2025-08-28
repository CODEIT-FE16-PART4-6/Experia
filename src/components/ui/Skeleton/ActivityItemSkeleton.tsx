const ActivityItemSkeleton = () => {
  return (
    <li className='max-w-none animate-pulse lg:max-w-[282px]'>
      <div className='group block'>
        <div className='relative mb-4 aspect-square w-full overflow-hidden rounded-[20px] bg-gray-200'></div>

        <div className='flex gap-1 text-base'>
          <div className='h-5 w-24 rounded-md bg-gray-200'></div>
        </div>

        <div className='mt-2.5 mb-3.5 h-6 w-4/5 rounded-md bg-gray-200'></div>

        <div className='flex items-center'>
          <div className='h-6 w-1/2 rounded-md bg-gray-200'></div>
        </div>
      </div>
    </li>
  );
};

export default ActivityItemSkeleton;
