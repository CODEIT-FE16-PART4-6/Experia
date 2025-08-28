'use client';

import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from './Button';
import Image from 'next/image';
import RefreshIcon from '@/assets/icons/ic_refresh.svg';

interface DropdownOptionsItem {
  label: string;
  value: string;
}

interface DropdownOptionsProps {
  items: DropdownOptionsItem[];
  placeholderLabel?: string;
}

const DropdownOptions = ({ items, placeholderLabel }: DropdownOptionsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState(placeholderLabel ?? items[0].label);

  const handleClick = (item: DropdownOptionsItem) => {
    setSelectedItem(item.label);

    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('option', item.value);

    // URL 업데이트 (페이지 이동 없이 쿼리 파라미터만 변경)
    router.push(`?${currentParams.toString()}`);
  };

  const handleReset = () => {
    setSelectedItem('필터');

    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('option');

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className='flex gap-2'>
      <Button type='button' className='rounded-2xl' onClick={handleReset} title='필터 초기화'>
        <RefreshIcon />
      </Button>

      <Menu as='div' className='relative w-full'>
        {/* 트리거 버튼 */}
        <MenuButton as='div' className='cursor-pointer'>
          <Button
            size='md'
            type='button'
            className='border-primary hover:text-primary w-[160px] justify-between rounded-2xl py-[14px] text-lg font-medium hover:bg-white'
          >
            {selectedItem}
            <Image
              src='/icons/ic_ArrowDownFill.svg'
              alt='드롭다운 열기/닫기'
              width={22}
              height={22}
            />
          </Button>
        </MenuButton>

        {/* 드롭다운 메뉴 */}
        <Transition
          as={Fragment}
          enter='transition duration-200 ease-out'
          enterFrom='transform -translate-y-2 opacity-0'
          enterTo='transform translate-y-0 opacity-100'
          leave='transition duration-200 ease-out'
          leaveFrom='transform translate-y-2 opacity-100'
          leaveTo='transform -translate-y-2 opacity-0'
        >
          <MenuItems className='absolute right-0 mt-2 w-40 rounded-2xl border border-gray-300 bg-white shadow-lg focus:outline-none'>
            {items.map((item, index) => (
              <MenuItem key={`${item}-${index}`}>
                {() => (
                  <button
                    onClick={() => handleClick(item)}
                    className='block w-full border-b border-gray-300 py-[18px] text-lg font-medium text-gray-900 last:border-b-0'
                  >
                    {item.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownOptions;
