import Snb from '@/components/layout/Snb';

interface MyPageLayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='flex flex-col gap-4 px-6 pt-[72px] md:flex-row lg:mx-auto lg:w-[1200px] lg:gap-6 lg:px-0'>
        <aside className='h-full shrink-0 items-center rounded-xl border border-gray-400 bg-gray-100 p-6 font-bold text-gray-700 shadow-2xl sm:mx-auto sm:w-[344px] md:mx-0 md:w-[251px] lg:w-[384px]'>
          <Snb />
        </aside>
        <section className='w-full'>{children}</section>
      </div>
    </div>
  );
}
