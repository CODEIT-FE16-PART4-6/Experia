import { Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, ...props }, ref) => {
    return (
      <>
        {props.label && <Label>{props.label}</Label>}
        <div className='relative w-full'>
          <Input
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...props}
            className={`focus:border-primary ${error ? 'border-red-600' : 'border-gray-600'}`}
          />
        </div>
        <p className='md:text-md mt-1 h-6 text-sm text-red-600'>{error ? error : ''}</p>
      </>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
