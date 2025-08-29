import { ChangeEvent, useRef, useState } from 'react';
import { REQUEST_URL } from '@/utils/api-public';

const MAX_SIZE = 1024 * 1024 * 5; // 5MB
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUwOCwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjQ3Njc2MSwiZXhwIjoxNzU2NDc4NTYxLCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.WT_7hcOv-sEUITwDn9KeeYWzb7VY6ZtRjeULneEi288';

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  // 이미지 업로드 함수
  const fetchImage = async (file: File): Promise<string | undefined> => {
    try {
      const URL = `${REQUEST_URL}/activities/image`;

      // 한글 파일명 오류 방지 인코딩
      const timestamp = Date.now();
      const ext = file.name.split('.').pop();
      const encodingFileName = `image_${timestamp}.${ext}`;

      const encodingFile = new File([file], encodingFileName, {
        type: file.type,
      });

      const formData = new FormData();
      formData.append('image', encodingFile);

      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        console.log('이미지 업로드 요청 에러!');
        return;
      }

      const data = await res.json();

      return data.activityImageUrl;
    } catch (error) {
      setUploadImage(null); // 업로드 실패시 프리뷰용 파일 객체 제거
      throw error;
    } finally {
      setIsUploading(() => false);
    }
  };

  // input file onChange
  const handleChangeImage = (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<string | undefined> | undefined => {
    if (!e.target.files) return; // 파일 객체 없을 때
    if (!e.target.files.length) return; // 이미지 업로드 취소시

    const file = e.target.files[0];
    e.target.value = ''; // 중복 파일 업로드를 위한 초기화

    // 이미지 용량 검증
    if (file.size > MAX_SIZE) {
      alert('사진 최대 용량은 5MB입니다.');
      return;
    }

    setUploadImage(file);
    setIsUploading(() => true);

    return fetchImage(file);
  };

  return { uploadImage, handleChangeImage, fileRef, isUploading };
};

export default useImageUpload;
