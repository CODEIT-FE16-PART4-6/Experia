import CameraIcon from '@/assets/icons/CameraIcon.svg';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ImageUploadButtonProps {
  className?: string;
  isUploading: boolean;
  onClick: () => void;
}

const ImageUploadButton = ({ className, isUploading, onClick }: ImageUploadButtonProps) => {
  return (
    <button
      type='button'
      aria-label='이미지 등록 버튼'
      className={`group hover:bg-primary-10 hover:border-primary hover:bg-green-light hover:ring-green-light mr-2 inline-flex aspect-square w-[120px] shrink-0 items-center justify-center rounded-2xl border-2 border-gray-300 transition-colors md:w-[140px] ${className}`}
      onClick={onClick}
    >
      {!isUploading ? (
        <CameraIcon className='group-hover:text-primary h-[24px] w-[26px] text-gray-300' />
      ) : (
        <LoadingSpinner />
      )}
    </button>
  );
};

export default ImageUploadButton;
