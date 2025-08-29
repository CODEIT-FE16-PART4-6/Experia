interface BaseFetchOptions {
  path: string;
  query?: Record<string, string | number | boolean | null | undefined>;
}

interface ISRFetchOptions extends BaseFetchOptions {
  renderType: 'isr';
  revalidate: number; // ISR일 때는 revalidate 필수
}

interface CommonFetchOptions extends BaseFetchOptions {
  renderType?: 'ssr' | 'ssg' | 'csr';
  revalidate?: never; // revalidate 사용 불가
}

export type FetchOptions = ISRFetchOptions | CommonFetchOptions;
