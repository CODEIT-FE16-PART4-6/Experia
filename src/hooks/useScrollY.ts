'use client';

import { useState, useEffect } from 'react';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScrollY = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScrollY);
    return () => window.removeEventListener('scroll', handleScrollY);
  }, []);

  return scrollY;
};

export default useScrollY;
