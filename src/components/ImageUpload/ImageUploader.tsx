import Image from 'next/image';

import { ChangeEvent } from 'react';

import clsx from 'clsx';
import ImageUploadButton from './ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';
import ImagePreview from './ImagePreview';

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
        className={clsx('mr-2 mb-2', { 'border-red-500 bg-red-100': error })}
      />
      <input type='file' className='hidden' ref={fileRef} onChange={handleImageUrl} />

      {value && <ImagePreview src={value} alt={'배너 이미지 미리보기'} onRemove={handleRemove} />}
    </div>
  );
};

export default ImageUploader;
