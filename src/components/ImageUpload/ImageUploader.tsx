import Image from 'next/image';

import { ChangeEvent } from 'react';

import ImageUploadButton from './ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';

interface ImageUploaderProps {
  value: string | null;
  error?: string;
  onChange?: (url: string) => void;
}

const ImageUploader = ({ value, error, onChange }: ImageUploaderProps) => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload();

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  const handleImageUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChangeImage(e);
      if (url) {
        onChange?.(url);
      }
    } catch (err) {
      console.error(err);
      // if (err.status === 401) {
      //   alert('로그인이 필요합니다.');
      // } else {
      //   alert('문제가 발생했습니다.');
      // }
    }
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
        <figure className='border-primary bg-primary-10 relative ml-2 flex aspect-square w-[140px] items-center justify-center overflow-hidden rounded-2xl border-2'>
          <Image
            src={value}
            alt='이미지'
            width={140}
            height={140}
            className='h-full w-full object-cover'
          />
        </figure>
      )}
    </div>
  );
};

export default ImageUploader;
