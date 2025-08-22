import { Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
  inputLabelGap?: number;
  autoComplete?: string;
  error?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, error, className, inputLabelGap, ...props }, ref) => {
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
            autoComplete={props.autoComplete}
            className={`input hover:border-primary ${error ? 'border-red-500' : 'border-gray-300'} ${className || ''}`}
            ref={ref}
            {...props}
          />
        </div>
        <p className={`md:text-md mt-1 h-6 text-sm text-red-500`}>{error ? error : ''}</p>
      </>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
