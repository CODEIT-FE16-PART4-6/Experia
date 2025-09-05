'use client'
import React, { useEffect, useRef, useState } from "react"
import InputField from "@/components/InputField"
import Image from "next/image"
import debounce from "@/utils/debounce"

interface SearchBarProps {
  onSearch: (query: string) => void
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
    debouncedOnSearchRef.current(query);

    // 컴포넌트 언마운트 시 디바운스 취소
    return () => {
      debouncedOnSearchRef.current.cancel();
    };
  }, [query]);

  const handleSearch = () => {
    onSearch(query.trim());
  }

  // 엔터키
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <section className="py-10 px-4 md:py-14 bg-gray-100">
      <div className="flex flex-col gap-4 md:gap-8 max-w-3xl mx-auto items-center">
        <h1 className="text-nomad-black text-3xl md:text-4xl font-bold">
          세상의 모든 체험, Experia
        </h1>

        <form onSubmit={e => e.preventDefault()} className="w-full">
          <div className="relative w-full">
            <InputField
              type="text"
              name="query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="내가 원하는 체험은..."
              className="w-full rounded-full bg-white shadow py-5 pr-20 border border-transparent focus:border focus:border-nomad-black focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              aria-label="검색"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Image
                src='/icons/ic_SearchIcon.svg'
                alt='검색 아이콘'
                width={68}
                height={68}
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(SearchBarClient);