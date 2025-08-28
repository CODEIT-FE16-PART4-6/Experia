'use client';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

interface SectionTitleProps {
  title: string;
  btnText?: string;
  href?: string;
  onClick?: () => void;
}

const SectionTitle = ({ title, btnText, href, onClick }: SectionTitleProps) => {
  const router = useRouter();
  const isBtnLink = btnText && href;
  const isBtn = btnText && !href;

  return (
    <div className='mb-4 flex items-center justify-between lg:mb-6'>
      <h2 className='text-4xl font-bold text-black'>{title}</h2>
      {isBtnLink && (
        <Button
          variant='POSITIVE'
          size='md'
          onClick={() => router.push(href)}
          className='!w-auto min-w-[120px]'
        >
          {btnText}
        </Button>
      )}
      {isBtn && (
        <Button variant='POSITIVE' size='md' onClick={onClick} className='!w-auto min-w-[120px]'>
          {btnText}
        </Button>
      )}
    </div>
  );
};

export default SectionTitle;
