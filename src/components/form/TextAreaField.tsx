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
            'focus:border-primary w-full rounded-md border border-gray-600 bg-white p-4 transition-colors duration-300 outline-none',
            error && 'border-red-600 bg-red-100',
            className,
          )}
          {...rest}
        />
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </Field>
    );
  },
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
