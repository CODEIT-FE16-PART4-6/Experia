import Snb from '@/components/layout/Snb';
interface MyPageLayoutProps {
  children: React.ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className='flex min-h-screen flex-shrink-0 md:ml-[24px] lg:ml-[360px]'>
      <aside>
        <Snb />
      </aside>
      <section className='flex-1 p-4'>{children}</section>
    </div>
  );
}
