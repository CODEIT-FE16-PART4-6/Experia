import { useState } from 'react';
import Image from 'next/image';

export interface DropdownMeatballProps {
  onEdit: () => void;
  onDelete: () => void;
}
/**
 * @param onEdit 수정하기 콜백 함수
 * @param onDelete 삭제하기 콜백 함수
 * @returns 수정하기 삭제하기
 */
export const DropdownMeatball = ({ onEdit, onDelete }: DropdownMeatballProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='relative inline-block text-left'>
      {/* 미트볼 아이콘 버튼 */}
      <div
        onClick={toggleDropdown}
        aria-label='Menu'
        className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none'
      >
        <Image src='icons/ic_meatball_40px.svg' alt='메뉴 버튼' width={16} height={16} />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-40 rounded-md border border-gray-300 bg-white shadow-lg'>
          <div
            className='w-full px-4 py-2 text-left'
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            수정하기
          </div>
          <div
            className='w-full px-4 py-2 text-left'
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
};
