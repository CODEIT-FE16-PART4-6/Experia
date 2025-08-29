'use client';

import { Fragment, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import clsx from 'clsx';

interface DropdownSelectItem {
  id: string | number;
  value: string;
}

interface DropdownSelectProps {
  items: DropdownSelectItem[];
  label?: string;
  placeholder?: string;
  selectedItem?: DropdownSelectItem | null;
  onChange?: (value: DropdownSelectItem | null) => void;
}

const DropdownSelect = ({
  items,
  label,
  placeholder = '카테고리',
  selectedItem,
  onChange,
}: DropdownSelectProps) => {
  return (
    <div className='w-full'>
      {label && <label className='mb-1 block font-semibold'>{label}</label>}

      <Listbox value={selectedItem} onChange={onChange}>
        <div className='relative'>
          {/* 버튼 */}
          <ListboxButton className='flex w-full cursor-pointer items-center justify-between rounded border border-gray-800 bg-white px-4 py-2 text-left'>
            {selectedItem ? selectedItem.value : placeholder}
          </ListboxButton>

          {/* 옵션 목록 */}
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ListboxOptions className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-800 bg-white shadow-lg'>
              {items.map(item => (
                <ListboxOption
                  key={item.id}
                  value={item}
                  className={({ active, selected }) =>
                    clsx(
                      'cursor-pointer px-4 py-2 select-none',
                      active && 'bg-blue-500 text-white',
                      selected && 'bg-blue-500 text-white',
                    )
                  }
                >
                  <div className='flex items-center justify-between'>{item.value}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropdownSelect;
