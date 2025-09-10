'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/Button';

export function LinkButton({
  href,
  children,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Button variant='POSITIVE' size='md' onClick={() => router.push(href)} {...rest}>
      {children}
    </Button>
  );
}
