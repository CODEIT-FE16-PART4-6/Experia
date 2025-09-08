import { forwardRef, InputHTMLAttributes } from 'react';
import { Field, Input } from '@headlessui/react';

interface AddressFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  placeholder?: string;
  error?: string;
}

const AddressField = forwardRef<HTMLInputElement, AddressFieldProps>(
  ({ placeholder, error, ...rest }, ref) => {
    return (
      <Field>
        <Input
          ref={ref}
          type='text'
          placeholder='주소를 입력해주세요'
          {...rest}
          className={error ? 'border-red-primary bg-red-100' : ''}
        />
        {error && <p className='mt-3 text-red-500'>{error}</p>}
      </Field>
    );
  },
);

export default AddressField;
