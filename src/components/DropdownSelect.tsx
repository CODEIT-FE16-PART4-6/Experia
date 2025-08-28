'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
export interface Activity {
  id: number;
  name: string;
}

export interface DropdownProps {
  activities: Activity[];
  value: Activity | null;
  onChange: (value: number) => void;
  label?: string;
  placeholder?: string;
}
/**
 * 드롭다운 선택 컴포넌트
 * @param onChange 선택된 activity.id를 부모 컴포넌트로 전달하는 콜백 함수
 * @param value 현재 선택된 activity
 * @param activities 드롭다운에 표시할 활동 목록
 */
export const DropdownSelect = ({
  activities,
  value,
  onChange,
  label,
  placeholder,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = useCallback(
    (activity: Activity) => {
      onChange(activity.id);
      setIsOpen(false);
    },
    [onChange],
  );

  const displayValue = value ? value.name : placeholder || '카테고리';

  return (
    <div className='border' ref={containerRef}>
      {label && <label className='mb-1 block font-semibold'>{label}</label>}
      <div
        className='flex cursor-pointer items-center justify-between rounded border border-gray-800 px-4 py-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        <Image
          src='icons/ic_chevron_down.svg'
          alt='Dropdown Icon'
          width={24}
          height={24}
          style={{
            transform: `rotate(${isOpen ? 180 : 0}deg)`,
            transition: 'transform 0.2s ease',
          }}
        />
      </div>
      {isOpen && (
        <div className='absolute z-50 mt-1 max-h-60 w-64 overflow-y-auto rounded border border-gray-800 bg-white shadow-lg'>
          {activities.map(activity => (
            <div
              key={activity.id}
              className={clsx('cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white', {
                'bg-blue-500 text-white': value?.id === activity.id,
              })}
              onClick={() => handleSelect(activity)}
            >
              {activity.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
