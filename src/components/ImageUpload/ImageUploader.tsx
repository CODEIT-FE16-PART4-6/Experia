import Image from 'next/image';

import { ChangeEvent } from 'react';

import ImageUploadButton from './ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';
import DeleteIcon from '@/assets/icons/ic_delete.svg';
import clsx from 'clsx';

interface ImageUploaderProps {
  value: string | null;
  error?: string;
  onChange?: (url: string | null) => void;
}

const ImageUploader = ({ value, error, onChange }: ImageUploaderProps) => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload('/activities/image');

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  const handleImageUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChangeImage(e);
      if (url) {
        onChange?.(url.activityImageUrl || null);
      }
    } catch (err) {
      console.error(err);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleRemove = () => {
    onChange?.(null);
  };

  return (
    <div className='flex flex-wrap'>
      <ImageUploadButton
        onClick={handleImageUpload}
        isUploading={isUploading}
        className={clsx('mr-2 mb-2', { 'border-red-500': error })}
      />
      <input type='file' className='hidden' ref={fileRef} onChange={handleImageUrl} />

      {value && (
        <div className='border-primary relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl border-2 md:h-[140px] md:w-[140px]'>
          <figure className='bg-primary-10 overflow-hidden'>
            <Image
              src={value}
              alt='이미지'
              width={140}
              height={140}
              className='aspect-square h-full w-full object-cover'
            />
          </figure>
          <button
            type='button'
            aria-label='이미지 삭제'
            className='group absolute inset-0 z-[1] flex h-full w-full items-center justify-center bg-[rgba(27,27,27,0.6)] p-2 text-lg text-white opacity-0 transition-colors hover:opacity-100'
            onClick={handleRemove}
          >
            <DeleteIcon className='h-6 w-6 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
