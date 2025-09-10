import Image from 'next/image';
import { ChangeEvent } from 'react';

import useImageUpload from '@/hooks/useImageUpload';

import ImageUploadButton from './ImageUploadButton';

interface SubImage {
  id?: number;
  imageUrl: string;
}

interface MultiImageUploaderProps {
  images: SubImage[] | null;
  maxCount?: number;
  error?: string;
  onChange?: (urls: SubImage[]) => void;
}

const MultiImageUploader = ({ images, maxCount = 4, error, onChange }: MultiImageUploaderProps) => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload('/activities/image');

  const handleImageUpload = () => {
    if ((images ?? []).length >= maxCount) {
      alert(`상세 이미지는 ${maxCount}개까지 등록할 수 있습니다.`);
      return;
    }
    fileRef.current?.click();
  };

  const handleImageUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChangeImage(e);
      const imageUrl = url?.activityImageUrl;

      if (!imageUrl) {
        // undefined 또는 빈값일 경우
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      if (url) {
        const newImages = [...(images ?? []), { imageUrl }]; // null이면 빈 배열로 시작
        if (newImages.length > maxCount) {
          alert(`상세 이미지는 ${maxCount}개까지 등록할 수 있습니다.`);
          return;
        }
        onChange?.(newImages);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = (imgIdx: number) => {
    const newImages = images?.filter((_, i) => i !== imgIdx) ?? [];
    onChange?.(newImages);
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

        {(images ?? []).map((img, i) => (
          <figure
            key={i}
            className='border-primary bg-primary-10 relative flex aspect-square w-[140px] items-center justify-center rounded-2xl border-2'
          >
            <Image
              src={img.imageUrl}
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
