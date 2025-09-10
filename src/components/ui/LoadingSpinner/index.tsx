import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <figure className='my-4 flex w-full justify-center'>
      <Image
        src='/images/img_LoadingSpinner.svg'
        alt='로딩중...'
        width={36}
        height={40}
        className='h-[40px] w-[36px] animate-spin'
      />
    </figure>
  );
};

export default LoadingSpinner;
