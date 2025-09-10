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
      className={`group flex items-center justify-center w-[140px] aspect-square border border-gray-300 rounded-2xl hover:bg-primary-10 transition-colors ${className}`}
      onClick={onClick}
    >
      {!isUploading ? (
        <CameraIcon className='text-gray-300 w-[26px] h-[24px] group-hover:text-white' />
      ) : (
        <LoadingSpinner />
      )}
    </button>
  );
};

export default ImageUploadButton;
