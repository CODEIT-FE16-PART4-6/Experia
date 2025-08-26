import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const ActivityPage = () => {
  //mock****************************
  const ActivityContent = {
    tag: '문화•예술',
    title: '함께 배우면 즐거운 스트릿 댄스',
    rating: 4.9,
    reviewCount: 293,
    adress: '서울 중구 청계천로 100 10F',
    description:
      '안녕하세요! 저희 스트릿 댄스 체험을 소개합니다. 저희는 신나고 재미있는 스트릿 댄스 스타일을 가르칩니다. 크럼프는 세계적으로 인기 있는 댄스 스타일로, 어디서든 춤출 수 있습니다. 저희 체험에서는 새로운 스타일을 접할 수 있고, 즐거운 시간을 보낼 수 있습니다. 저희는 초보자부터 전문가까지 어떤 수준의 춤추는 사람도 가르칠 수 있도록 준비해놓았습니다. 저희와 함께 즐길 수 있는 시간을 기대해주세요! 각종 음악에 적합한 스타일로, 저희는 크럼프 외에도 전통적인 스트릿 댄스 스타일과 최신 스트릿 댄스 스타일까지 가르칠 수 있습니다. 저희 체험에서는 전문가가 직접 강사로 참여하기 때문에, 저희가 제공하는 코스는 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있도록 준비해놓았습니다. 저희 체험을 참가하게 된다면, 즐거운 시간 뿐만 아니라 새로운 스타일을 접할 수 있을 것입니다.',
  };
  //*********************************** */

  return (
    <main className='bg-[#fafafa]'>
      액티비티상세페이지
      <div className='text-[14px]'>{ActivityContent.tag}</div>
      <div className='text-[24px] font-bold'>{ActivityContent.title}</div>
      <div>
        {ActivityContent.rating} {ActivityContent.adress}
      </div>
    </main>
  );
};
export default ActivityPage;
