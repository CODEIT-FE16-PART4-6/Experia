'use client'
// Headless UI Button alias
import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';

// 버튼 스타일 타입
type ButtonStyle = 'DEFAULT' | 'POSITIVE' | 'NEGATIVE';
// 버튼 크기 타입
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonStyle; // 'DEFAULT' | 'POSITIVE' | 'NEGATIVE'
  size?: ButtonSize; // 'sm' | 'md' | 'lg'
  disabled?: boolean; // 버튼 비활성화
  children: React.ReactNode;
  className?: string; // 추가 클래스 적용!
}

const Button = ({ variant = 'DEFAULT', size = 'md', disabled = false, className, children, ...rest }: ButtonProps) => {
  // 기본 스타일
  const baseStyle = 'w-full rounded-md border font-semibold transition-all flex justify-center items-center'

  // variant 클래스
  const variantClasses: Record<ButtonStyle, string> = {
    DEFAULT: 'bg-white hover:bg-nomad-black hover:text-white disabled:bg-gray-600',
    POSITIVE: 'bg-nomad-black text-white disabled:bg-gray-600',
    NEGATIVE: 'bg-gray-600 text-white disabled:bg-gray-600',
  }

  // size 클래스
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <HeadlessButton className={clsx(baseStyle, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </HeadlessButton >
  );
};

export default Button;