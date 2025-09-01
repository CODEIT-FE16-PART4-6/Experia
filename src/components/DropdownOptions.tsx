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
      <Button
        type='button'
        className='flex h-[42px] w-[42px] items-center justify-center rounded-xl p-0 lg:h-[56px] lg:w-[56px] lg:rounded-2xl'
        onClick={handleReset}
        title='필터 초기화'
      >
        <RefreshIcon className='aspect-square h-[20px] w-[20px] lg:h-6 lg:w-6' />
      </Button>

      <Menu as='div' className='relative w-[120px] lg:w-[160px]'>
        {/* 트리거 버튼 */}
        <MenuButton as='div' className='cursor-pointer'>
          <Button
            size='md'
            type='button'
            className='border-primary text-primary hover:text-primary text-md justify-between rounded-xl py-2 font-medium hover:bg-white lg:rounded-2xl lg:py-[14px] lg:text-lg'
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
          <MenuItems className='absolute right-0 mt-2 w-full rounded-xl border border-gray-300 bg-white shadow-lg focus:outline-none lg:rounded-2xl'>
            {items.map((item, index) => (
              <MenuItem key={`${item}-${index}`}>
                <button
                  onClick={() => handleClick(item)}
                  className='text-md hover:text-primary block w-full border-b border-gray-300 py-2.5 font-medium text-gray-900 last:border-b-0 hover:font-bold lg:py-[18px] lg:text-lg'
                >
                  {item.label}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownOptions;
