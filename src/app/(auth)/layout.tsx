import { pretendard } from '@/utils/fonts';

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
