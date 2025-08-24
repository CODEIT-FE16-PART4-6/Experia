'use client'
import { Field, Input, Label } from '@headlessui/react';
import { forwardRef } from 'react';

interface InputProps {
  type?: string;
  placeholder: string;
  label?: string;
  autoComplete?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, autoComplete, label, error, ...rest }, ref) => {
    return (
      <Field>
        {label && (<Label>{label}</Label>)}
        <div className='relative w-full'>
          <Input
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            ref={ref}
            {...rest}
            className={`focus:border-primary ${error ? 'border-red-600' : 'border-gray-600'}`}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </Field>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
