'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import { cn } from '@/utils/cn';


interface DropdownSelectItem {
  id: string | number;
  value: string;
}

interface DropdownSelectProps {
  items: DropdownSelectItem[];
  label?: string;
  placeholder?: string;
  selectedItem?: DropdownSelectItem | null;
  error?: string;
  onChange?: (value: DropdownSelectItem | null) => void;
}

const DropdownSelect = ({
  items,
  label,
  placeholder = '카테고리',
  selectedItem,
  error,
  onChange,
}: DropdownSelectProps) => {
  return (
    <div className='w-full'>
      {label && <label className='mb-1 block font-semibold'>{label}</label>}

      <Listbox as='div' value={selectedItem} onChange={onChange}>
        {({ open }) => (
          <div className='relative'>
            {/* 버튼 */}
            <ListboxButton
              className={cn(
                'flex w-full items-center justify-between rounded-md border border-gray-600 bg-white p-3.5 text-base transition-colors duration-300 outline-none',
                open && 'border-primary',
                error && 'border-red-primary bg-red-100',
              )}
            >
              {selectedItem ? selectedItem.value : placeholder}
              <Image
                src='/icons/ic_ArrowDownLine.svg'
                alt='카테고리 열기'
                width={24}
                height={24}
                className={clsx('transition-transform', open && 'rotate-180')}
              />
            </ListboxButton>

            {/* 옵션 목록 */}
            <Transition
              as={Fragment}
              enter='transition ease-in duration-150'
              enterFrom='opacity-0 -translate-y-2'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-2'
            >
              <ListboxOptions className='absolute z-[3] mt-3 flex w-full flex-col gap-2 overflow-auto rounded bg-white p-2 shadow-2xl outline-none'>
                {items.map(item => (
                  <ListboxOption
                    key={item.id}
                    value={item}
                    className={({ active, selected }) =>
                      clsx(
                        'flex rounded-md px-3 py-2 select-none',
                        active && 'bg-primary text-white',
                        selected && 'bg-primary text-white',
                      )
                    }
                  >
                    <Image
                      src='/icons/ic_CheckWhite.svg'
                      alt='선택'
                      width={20}
                      height={20}
                      className='mr-2'
                    />
                    <div className='flex items-center justify-between'>{item.value}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>

      {error && <p className='mt-3 text-red-500'>{error}</p>}
    </div>
  );
};

export default DropdownSelect;
