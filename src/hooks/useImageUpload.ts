import { ChangeEvent, useRef, useState } from 'react';

import fetchClientData from '@/utils/api-client/fetchClientData';

interface UploadedImage {
  profileImageUrl?: string;
  activityImageUrl?: string;
}

const MAX_SIZE = 1024 * 1024 * 5; // 5MB

const useImageUpload = (endpoint: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  // 이미지 업로드 함수
  const fetchImage = async (file: File): Promise<UploadedImage | undefined> => {
    try {
      // 한글 파일명 오류 방지 인코딩
      const timestamp = Date.now();
      const ext = file.name.split('.').pop();
      const encodingFileName = `image_${timestamp}.${ext}`;

      const encodingFile = new File([file], encodingFileName, {
        type: file.type,
      });

      const formData = new FormData();
      formData.append('image', encodingFile);

      const data = await fetchClientData(endpoint, {
        method: 'POST',
        body: formData,
      });

      return data as UploadedImage;
    } catch (error) {
      setPreviewImage(null); // 업로드 실패시 프리뷰용 파일 객체 제거
      throw error;
    } finally {
      setIsUploading(() => false);
    }
  };

  // input file onChange
  const handleChangeImage = (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<UploadedImage | undefined> | undefined => {
    if (!e.target.files) return; // 파일 객체 없을 때
    if (!e.target.files.length) return; // 이미지 업로드 취소시

    const file = e.target.files[0];
    e.target.value = ''; // 중복 파일 업로드를 위한 초기화

    // 이미지 용량 검증
    if (file.size > MAX_SIZE) {
      alert('사진 최대 용량은 5MB입니다.');
      return;
    }

    // 파일 타입(MIME Type) 검증 (svg 업로드 에러 방지)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
      return;
    }

    setPreviewImage(file);
    setIsUploading(() => true);

    return fetchImage(file);
  };

  return { uploadImage: previewImage, handleChangeImage, fileRef, isUploading };
};

export default useImageUpload;
