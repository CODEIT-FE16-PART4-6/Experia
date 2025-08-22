import { Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
  inputLabelGap?: number;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, inputLabelGap, ...props }, ref) => {
    return (
      <>
        {props.label && (
          <Label
            className='block font-medium md:text-base'
            style={{ marginBottom: `${inputLabelGap}px` }}
          >
            {props.label}
          </Label>
        )}
        <div className='relative w-full'>
          <Input
            type={type}
            placeholder={placeholder}
            className='input hover:primary border-gary-300'
            ref={ref}
            {...props}
          />
        </div>
        <p className='md:text-md mt-1 h-6 text-sm'></p>
      </>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
