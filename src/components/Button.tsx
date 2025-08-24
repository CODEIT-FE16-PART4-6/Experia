'use client'
import { Button } from '@headlessui/react';
import clsx from 'clsx';



interface ButtonProps {
  children: React.ReactNode;
}

const ButtonField = ({ children }: ButtonProps) => {
  const baseStyle = 'w-full rounded-md border font-bold transition-all'


  return (
    <Button className={clsx(baseStyle)}>
      {children}
    </Button>
  );
};

export default ButtonField;