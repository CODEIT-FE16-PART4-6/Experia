'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import InputField from '@/components/InputField';
import debounce from '@/utils/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string | null;
}

const SearchBarClient = ({ onSearch, initialQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery ?? '');
  const debouncedOnSearchRef = useRef(debounce(onSearch, 500));

  // 초기 검색어 반영
  useEffect(() => {
    setQuery(initialQuery ?? '');
  }, [initialQuery]);

  // query 변경 시 디바운스 검색 호출
  useEffect(() => {
    const debouncedSearch = debouncedOnSearchRef.current;
    debouncedSearch(query);

    // 컴포넌트 언마운트 시 디바운스 취소
    return () => {
      debouncedSearch.cancel();
    };
  }, [query]);

  const handleSearch = () => {
    onSearch(query.trim());
  };

  // 엔터키
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className='bg-gray-100 px-4 py-10 md:py-14'>
      <div className='mx-auto flex max-w-3xl flex-col items-center gap-4 md:gap-8'>
        <h1 className='text-nomad-black text-3xl font-bold md:text-4xl'>
          세상의 모든 체험, Experia
        </h1>

        <form onSubmit={e => e.preventDefault()} className='w-full'>
          <div className='relative w-full'>
            <InputField
              type='text'
              name='query'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='내가 원하는 체험은...'
              className='focus:border-nomad-black w-full rounded-full border border-transparent bg-white py-5 pr-20 shadow focus:border focus:ring-0 focus:outline-none'
            />
            <button
              type='button'
              aria-label='검색'
              onClick={handleSearch}
              className='absolute top-1/2 right-2 -translate-y-1/2'
            >
              <Image src='/icons/ic_SearchIcon.svg' alt='검색 아이콘' width={68} height={68} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(SearchBarClient);
