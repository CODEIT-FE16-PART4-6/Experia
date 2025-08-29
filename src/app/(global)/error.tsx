'use client';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.error(error.message);

  return (
    <div className='min-h-screen'>
      <p>에러가 발생했습니다.</p>
      <button className='text-primary underline underline-offset-4' onClick={() => reset()}>
        다시 시도하기
      </button>
    </div>
  );
};

export default Error;
