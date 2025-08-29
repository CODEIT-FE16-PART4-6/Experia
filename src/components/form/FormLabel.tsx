import { cn } from '@/utils/cn';

interface FormLabelProps {
  inputId?: string;
  children: string;
  className?: string;
}

const FormLabel = ({ inputId, children, className }: FormLabelProps) => {
  return (
    <label
      htmlFor={inputId ?? ''}
      className={cn('text-xl font-bold text-black md:text-2xl', className)}
    >
      {children}
    </label>
  );
};

export default FormLabel;
