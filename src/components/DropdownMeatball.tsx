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
        className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none'
      >
        <Image src='/icons/ActivityPageImgs/ic_Kebab.svg' alt='메뉴 버튼' width={40} height={40} />
      </div>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-40 rounded-md border border-gray-300 bg-white shadow-lg'>
          <div
            className='h-[50px] w-full px-2 py-2 text-center'
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            수정하기
          </div>
          <div
            className='h-[50px] w-full px-2 py-2 text-center'
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
