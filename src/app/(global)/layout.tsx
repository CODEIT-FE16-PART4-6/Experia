import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import '@/app/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Providers } from '@/components/provider/Providers';
import { pretendard } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Experia - Explorer the Area',
  description:
    '세계 곳곳의 문화·예술, 미식, 스포츠, 투어, 웰빙까지 — 다양한 체험들을 둘러보고, 예약하고, 등록하세요!',
  openGraph: {
    title: 'Experia - Explorer the Area',
    description: '세계 곳곳의 다양한 체험들을 구경하고, 예약하고, 등록하세요!',
    url: 'https://experia.click',
    siteName: 'Experia',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Experia thumbnail' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experia - Explorer the Area',
    description: '전세계의 다양한 체험을 예약하고, 나만의 체험 등록까지!',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <link rel='icon' href='/favicon-big.ico' type='image/png' sizes='400x400' />
      <body className={pretendard.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
