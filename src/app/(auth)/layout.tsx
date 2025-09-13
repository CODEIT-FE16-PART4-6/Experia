import '@/app/globals.css';
import { pretendard } from '@/utils/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experia',
};

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
};

export default AuthLayout;
