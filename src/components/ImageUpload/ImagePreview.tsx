import Image from 'next/image';
import { cn } from '@/utils/cn';
import DeleteIcon from '@/assets/icons/ic_delete.svg';

interface ImagePreviewProps {
  src: string;
  alt: string;
  imgIdx?: number;
  className?: string;
  onRemove: (imgIdx?: number) => void;
}

const ImagePreview = ({ src, alt, imgIdx, className, onRemove }: ImagePreviewProps) => {
  return (
    <div className='relative mr-2 h-[120px] w-[120px] md:h-[140px] md:w-[140px]'>
      <figure className='bg-primary-10 border-primary overflow-hidden rounded-2xl border-2'>
        <Image
          src={src}
          alt={alt}
          width={140}
          height={140}
          className={cn('aspect-square h-full w-full object-cover', className)}
        />
      </figure>
      <button
        type='button'
        aria-label='이미지 삭제'
        className='group absolute -top-2 -right-2 z-[1] flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(27,27,27,0.6)] p-2 text-lg text-white'
        onClick={() => onRemove(imgIdx)}
      >
        <Image
          src='/icons/ic_CloseWhite.svg'
          alt=''
          width={20}
          height={20}
          className='h-full w-full'
        />
      </button>
    </div>
  );
};

export default ImagePreview;
