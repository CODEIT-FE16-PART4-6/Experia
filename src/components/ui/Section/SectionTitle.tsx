import Button from '@/components/Button';
import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  action?: ReactNode;
}

const SectionTitle = ({ title, action }: SectionTitleProps) => {
  return (
    <div className='mb-4 flex items-center justify-between lg:mb-6'>
      <h2 className='text-4xl font-bold text-black'>{title}</h2>
      <div className='w-auto min-w-[120px]'>{action}</div>
    </div>
  );
};

export default SectionTitle;
