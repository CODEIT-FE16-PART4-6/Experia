import { Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, ...props }, ref) => {
    return (
      <>
        {props.label && <Label>{props.label}</Label>}
        <div className='relative w-full'>
          <Input type={type} placeholder={placeholder} ref={ref} {...props} />
        </div>
        <p className='md:text-md mt-1 h-6 text-sm text-red-600'>에러 메세지</p>
      </>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
