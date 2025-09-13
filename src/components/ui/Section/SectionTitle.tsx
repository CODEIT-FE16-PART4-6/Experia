import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

const SectionTitle = ({ title, action, className }: SectionTitleProps) => {
  return (
    <div className={cn('mb-4 flex items-center justify-between lg:mb-6', className)}>
      <h2 className='text-2xl font-bold text-black md:text-4xl'>{title}</h2>
      <div className='w-auto min-w-[120px]'>{action}</div>
    </div>
  );
};

export default SectionTitle;
