'use client';
import { Field, Label, Textarea, Description } from '@headlessui/react';
import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  className?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, description, label, className, error, ...rest }, ref) => {
    return (
      <Field>
        {label && <Label>{label}</Label>}
        {description && <Description>{description}</Description>}
        <Textarea
          ref={ref}
          name='description'
          placeholder={placeholder}
          rows={10}
          className={cn(
            'data-[focus]:border-primary w-full rounded-sm border border-gray-800 bg-white p-4',
            error && 'border-red-600',
            className,
          )}
          {...rest}
        />
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </Field>
    );
  },
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
