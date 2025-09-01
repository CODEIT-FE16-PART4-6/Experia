'use client';

import { useEffect } from 'react';

export default function ErrorPrint({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className='error-container'>
      <h2>오류가 발생하였습니다!</h2>
      <p>데이터를 불러오는데 문제가 발생했습니다.</p>
      <button onClick={() => reset()}>다시시도</button>
    </div>
  );
}
