import Snb from '@/components/layout/Snb';

interface MyPageLayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div>
      <div className='mt-[72px] flex min-h-screen w-[344px] flex-col md:w-[696px] md:flex-row lg:mx-auto lg:w-[1200px]'>
        <aside>
          <Snb />
        </aside>
        <section className='flex-1 p-4'>{children}</section>
      </div>
    </div>
  );
}
