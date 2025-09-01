import Image, { ImageProps } from 'next/image';
import { forwardRef } from 'react';

type Props = ImageProps & {
  onClick?: () => void;
};

//next/Image 사용시 ref 값을 가져오기 위한 컴포넌트

const ImageRef = forwardRef<HTMLImageElement, Props>(({ onClick, ...props }, ref) => (
  <Image {...props} ref={ref} onClick={onClick} />
));

export default ImageRef;
