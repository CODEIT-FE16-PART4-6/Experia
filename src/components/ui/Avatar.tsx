import Image from 'next/image';
import clsx from 'clsx';

interface AvatarProps {
  imgSrc: string | null;
  size?: 'sm' | 'md';
}

const Avatar = ({ size = 'md', imgSrc = '/images/ProfileDefaultImg.png' }: AvatarProps) => {
  return (
    <Image
      src={imgSrc ?? '/images/ProfileDefaultImg.png'}
      alt='프로필 사진'
      width={45}
      height={45}
      className={clsx('rounded-full', {
        'h-[45px] w-[45px]': size === 'md',
        'h-8 w-8': size === 'sm',
      })}
    />
  );
};

export default Avatar;
