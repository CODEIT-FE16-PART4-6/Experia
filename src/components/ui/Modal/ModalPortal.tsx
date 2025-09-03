'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setEl(document.getElementById('overlay-root'));
  }, []);

  if (!mounted) return null;
  if (!el) return null; // el이 존재할 때만 포탈 렌더

  return typeof window !== 'undefined' ? createPortal(children, el) : null;
};

export default ModalPortal;
