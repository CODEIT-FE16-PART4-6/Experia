//lib
import clsx from 'clsx';
import Image from 'next/image';
//SSR
interface SubImage {
  id: number;
  imageUrl: string;
}

interface ImagePropType {
  bannerImageUrl: string;
  subImages: SubImage[];
}

const PostImage = ({ bannerImageUrl, subImages }: ImagePropType) => {
  return (
    <div
      className={clsx(
        'h-[310px]',
        'md:grid',
        'lg:mx-auto lg:h-[534px] lg:w-[1152px] lg:gap-2',
        'overflow-hidden md:mr-6 md:ml-6 md:grid-cols-4 md:grid-rows-2 md:gap-1 md:rounded-[10px]',
      )}
    >
      <div className='full relative h-full bg-[#b3b3b3] md:col-span-2 md:row-span-2'>
        <Image src={bannerImageUrl} alt='대표 이미지' fill className='object-cover' />
      </div>
      {subImages.map((subimg: SubImage) => (
        <div key={subimg.id} className='full relative bg-[#b3b3b3]'>
          <Image
            src={subimg.imageUrl}
            alt={`서브 이미지${subimg.id}`}
            fill
            className='object-cover'
          />
        </div>
      ))}
      <div className='bg-[#b3b3b3]'>이미지 준비중 . . .</div>
    </div>
  );
};

export default PostImage;
