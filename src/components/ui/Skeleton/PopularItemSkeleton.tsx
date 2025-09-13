const PopularItemSkeleton = () => {
  return (
    <li className='w-full max-w-none animate-pulse lg:max-w-[390px]'>
      <div className='relative aspect-square w-full rounded-[20px] bg-gray-200'></div>
    </li>
  );
};

export default PopularItemSkeleton;
