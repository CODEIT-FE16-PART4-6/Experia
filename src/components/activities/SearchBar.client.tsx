'use client'
import React, { useState } from "react"
import InputField from "@/components/InputField"
import Image from "next/image"

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch = () => { } }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('검색 제출:', query)
    onSearch(query)
    setQuery('') // 제출 후 입력 초기화
  }

  return (
    <section className="py-10 px-4 md:py-14 bg-gray-100">
      <div className="flex flex-col gap-4 md:gap-8 max-w-3xl mx-auto items-center">
        <h1 className="text-nomad-black text-3xl md:text-4xl font-bold">
          세상의 모든 체험, Experia
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative w-full">
            <InputField
              type="text"
              name="query"
              onChange={e => setQuery(e.target.value)}
              placeholder="내가 원하는 체험은..."
              className="w-full rounded-full bg-white shadow py-5 pr-20 border border-transparent focus:border focus:border-nomad-black focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              aria-label="검색"
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

export default SearchBar