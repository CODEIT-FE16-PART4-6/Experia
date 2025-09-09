import Image from 'next/image';
import Link from 'next/link';
import { Activity } from '@/types/schema/activitiesSchema';
import { useState } from 'react';

const PopularItem = ({ item }: { item: Activity }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <li className="max-w-none text-black lg:max-w-[342px]">
      <Link href={`/activities/${item.id}`} className="group block relative">
        <div className="relative w-full aspect-square overflow-hidden rounded-[20px]">
          <Image
            src={item.bannerImageUrl}
            alt={item.description}
            width={280}
            height={280}
            className={`h-full w-full object-cover ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-60 scale-105 blur-md'
              }`}
            onLoad={() => setIsLoaded(true)}
          />

          {/* hover 시 썸네일 dimmed 처리 */}
          <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100'></div>

          {/* 이미지 위 텍스트 오버레이 */}
          <div className="absolute inset-0 flex flex-col gap-1 justify-end p-5 bg-gradient-to-t from-black/60 to-transparent">
            <span className="flex gap-1 text-md font-semibold items-center text-white">
              <Image src="/icons/ic_StarSmall.svg" alt="별점" width={18} height={18} />
              {item.rating}
              <span className="text-gray-200">(리뷰 {item.reviewCount}개)</span>
            </span>

            <h4 className="text-lg md:text-2xl font-semibold text-white overflow-hidden overflow-ellipsis whitespace-nowrap">{item.title}</h4>

            <h5 className="flex items-center text-base md:text-xl font-bold text-white">
              ₩ {item.price.toLocaleString()}
              <span className="ml-1 text-md font-normal text-gray-600">/ 인</span>
            </h5>
          </div>
        </div>
      </Link>
    </li>

  );
};

export default PopularItem;
