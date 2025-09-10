import { Field, Input } from '@headlessui/react';
import { forwardRef, InputHTMLAttributes } from 'react';

interface AddressFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  placeholder?: string;
}

const AddressField = forwardRef<HTMLInputElement, AddressFieldProps>(
  ({ placeholder, ...rest }, ref) => {
    return (
      <Field>
        <Input
          ref={ref}
          type='text'
          placeholder='주소를 입력해주세요'
          className='w-full rounded border px-3 py-2'
          {...rest}
        />
      </Field>
    );
  },
);

export default AddressField;
