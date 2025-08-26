'use client';

import { useEffect, useState } from 'react';
import debounce from '@/utils/debounce';

const useWindowWidth = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };

    const debouncedHandleWidth = debounce(handleWidth);

    handleWidth();

    window.addEventListener('resize', debouncedHandleWidth);
    return () => {
      window.removeEventListener('resize', debouncedHandleWidth); // 이벤트 리스너 제거
      debouncedHandleWidth.cancel(); // debounce setTimeout 제거
    };
  }, []);

  return width;
};

export default useWindowWidth;
