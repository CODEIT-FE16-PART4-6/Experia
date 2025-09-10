'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import ModalProvider from '@/components/ui/Modal/ModalProvider';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ModalProvider />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
