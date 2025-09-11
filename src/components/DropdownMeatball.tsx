import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

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
  const ref = useRef<HTMLDivElement>(null); //미트볼 바깥쪽 클릭시 사라지게 하려면 필요함

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //메모리 누수 방지
    };
  }, []); //미트볼 바깥쪽 클릭시 사라지게

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='relative inline-block text-left' ref={ref}>
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
        <div className='group absolute top-10 right-2 z-50 mt-2 w-40 overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg'>
          <div
            className='flex h-[50px] w-full cursor-pointer flex-col justify-center border-b border-gray-300 px-2 py-2 text-center hover:bg-gray-200'
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
          >
            수정하기
          </div>
          <div
            className='group-hover:gray-100 flex h-[50px] w-full cursor-pointer flex-col justify-center px-2 py-2 text-center hover:bg-gray-200'
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
