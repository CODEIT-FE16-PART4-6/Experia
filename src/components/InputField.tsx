'use client'
import { Field, Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder,label,labelClassName,inputClassName, error, ...rest }, ref) => {
    return (
      <Field>
        {label && <Label className={`${labelClassName}`}>{label}</Label>}
        <div className='relative w-full'>
          <Input
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            className={`focus:border-primary ${error ? 'border-red-600' : 'border-gray-600'} ${inputClassName}`}
          />
        </div>
          
            <p className='md:text-md mt-1 min-h-6 text-sm text-red-600'>{error? error:''}</p>
      </Field>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
