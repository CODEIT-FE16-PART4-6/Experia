import Image from 'next/image';

import { ChangeEvent } from 'react';

import ImageUploadButton from './ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';

interface MultiImageUploaderProps {
  value: string[] | null;
  maxCount?: number;
  error?: string;
  onChange?: (urls: string[]) => void;
}

const MultiImageUploader = ({ value, maxCount = 4, error, onChange }: MultiImageUploaderProps) => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload();

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  const handleImageUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChangeImage(e);
      if (url) {
        const newValue = [...(value ?? []), url]; // null이면 빈 배열로 시작
        if (newValue.length > maxCount) {
          alert(`상세 이미지는 ${maxCount}개까지 등록할 수 있습니다.`);
          return;
        }
        onChange?.(newValue);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = (imgIdx: number) => {
    const newValue = value?.filter((_, i) => i !== imgIdx) ?? [];
    onChange?.(newValue);
  };

  return (
    <>
      <div className='flex flex-wrap gap-6'>
        <ImageUploadButton
          onClick={handleImageUpload}
          isUploading={isUploading}
          className={error ? 'border-red-500' : ''}
        />
        <input type='file' className='hidden' ref={fileRef} onChange={handleImageUrl} />

        {(value ?? []).map((url, i) => (
          <figure
            key={i}
            className='border-primary bg-primary-10 relative flex aspect-square w-[140px] items-center justify-center rounded-2xl border-2'
          >
            <Image
              src={url}
              alt={`상세 이미지 ${i + 1}`}
              width={140}
              height={140}
              className='h-full w-full rounded-2xl object-cover'
            />
            <button
              type='button'
              className='absolute -top-2 -right-2 z-[1] flex h-6 w-6 items-center justify-center rounded-full bg-black p-2 text-lg text-white'
              onClick={() => handleRemove(i)}
            >
              x
            </button>
          </figure>
        ))}
      </div>
      <p className='text-gray-900'>{`* 이미지는 최대 ${maxCount}개까지 등록 가능합니다.`}</p>
    </>
  );
};

export default MultiImageUploader;
