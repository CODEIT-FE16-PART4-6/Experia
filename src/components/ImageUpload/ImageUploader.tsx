import Image from 'next/image';
import { ChangeEvent } from 'react';

import useImageUpload from '@/hooks/useImageUpload';

import ImageUploadButton from './ImageUploadButton';

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
      // 추후 모달로 띄울 예정
      // if (err.status === 401) {
      //   alert('로그인이 필요합니다.');
      // } else {
      //   alert('문제가 발생했습니다.');
      // }
    }
  };

  const handleRemove = () => {
    onChange?.(null);
  };

  return (
    <div className='flex'>
      <ImageUploadButton
        onClick={handleImageUpload}
        isUploading={isUploading}
        className={error ? 'border-red-500' : ''}
      />
      <input type='file' className='hidden' ref={fileRef} onChange={handleImageUrl} />

      {value && (
        <figure className='border-primary bg-primary-10 relative ml-2 flex aspect-square w-[140px] items-center justify-center rounded-2xl border-2'>
          <Image
            src={value}
            alt='이미지'
            width={140}
            height={140}
            className='h-full w-full rounded-2xl object-cover'
          />
          <button
            type='button'
            className='absolute -top-2 -right-2 z-[1] flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-lg text-white'
            onClick={handleRemove}
          >
            x
          </button>
        </figure>
      )}
    </div>
  );
};

export default ImageUploader;
