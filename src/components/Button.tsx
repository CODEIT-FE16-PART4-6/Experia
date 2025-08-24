'use client'
import { Button } from '@headlessui/react';

interface ButtonProps {
  children: React.ReactNode;
}

const ButtonField = ({ children }: ButtonProps) => {



  return (
    <Button className="rounded-md bg-sky-600 px-4 py-3 text-md text-white">
      {children}
    </Button>
  );
};

export default ButtonField;