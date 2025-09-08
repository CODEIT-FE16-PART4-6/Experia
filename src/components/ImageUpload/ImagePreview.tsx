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
    <div className='border-primary relative mr-2 h-[120px] w-[120px] overflow-hidden rounded-2xl border-2 md:h-[140px] md:w-[140px]'>
      <figure className='bg-primary-10 overflow-hidden'>
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
        className='group absolute inset-0 z-[1] flex h-full w-full items-center justify-center bg-[rgba(27,27,27,0.6)] p-2 text-lg text-white opacity-0 transition-colors hover:opacity-100'
        onClick={() => onRemove(imgIdx)}
      >
        <DeleteIcon className='h-6 w-6 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100' />
      </button>
    </div>
  );
};

export default ImagePreview;
