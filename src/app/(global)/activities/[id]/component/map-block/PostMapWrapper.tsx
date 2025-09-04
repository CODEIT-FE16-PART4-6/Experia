'use client';

import dynamic from 'next/dynamic';

const PostMap = dynamic(() => import('./PostMap'), {
  loading: () => (
    <>
      <div className='absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-4 border-gray-200 border-t-transparent'></div>
      <p className='absolute top-10/35 left-1/2 -translate-x-1/2 -translate-y-1/3 text-gray-200'>
        지도 정보를 불러오는중입니다.
      </p>
    </>
  ),
});

export default PostMap;
