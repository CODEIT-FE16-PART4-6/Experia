import { ChangeEvent } from 'react';

import useImageUpload from '@/hooks/useImageUpload';
import ImagePreview from './ImagePreview';

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

  const handleRemove = (imgIdx?: number) => {
    const newImages = images?.filter((_, i) => i !== imgIdx) ?? [];
    onChange?.(newImages);
  };

  return (
    <>
      <div className='flex flex-wrap gap-y-2'>
        <ImageUploadButton
          onClick={handleImageUpload}
          isUploading={isUploading}
          className={error ? 'border-red-500' : ''}
        />
        <input type='file' className='hidden' ref={fileRef} onChange={handleImageUrl} />

        {(images ?? []).map((img, i) => (
          <ImagePreview
            key={`${img}-${i}`}
            src={img.imageUrl}
            alt={`상세 이미지 ${i + 1}`}
            imgIdx={i}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <p className='text-md text-gray-900 md:text-base'>{`* 이미지는 최대 ${maxCount}개까지 등록 가능합니다.`}</p>
    </>
  );
};

export default MultiImageUploader;
