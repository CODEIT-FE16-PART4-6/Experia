// 'use client';
// import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// import ActivityCard from '@/app/(global)/mypage/components/ActivityCard';
// import { LinkButton } from '@/components/ui/LinkButton';
// import SectionTitle from '@/components/ui/Section/SectionTitle';
// import { Activities, ActivityType } from '@/types/schema/activitiesSchema';
// import fetchClientData from '@/utils/api-client/fetchClientData';

// const fetchMyActivities = async () => {
//   const response = await fetchClientData('/my-activities?size=20');
//   const validatedData = Activities.parse(response);
//   return validatedData.activities;
// };

// const fetchMyActivities = async () => {
//   const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/my-activities?size=20', {
//     method: 'GET',
//     headers: {
//       //임시 토큰값
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU3MiwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NzU4NjMwNiwiZXhwIjoxNzU3NTg4MTA2LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.xWc0bPf-iC030XWf59k4w5o5tIuUZr1sgF2TQ07qAHA', //Bearer 뒤에 토큰 붙여서 전송
//       'Content-Type': 'application/json', // 서버가 JSON 형식 데이터를 기대하는 경우
//     },
//   });
//   const data = await response.json();
//   const validatedData = Activities.parse(data);
//   return validatedData.activities;
// };

// const MyActivitiesPage = () => {
//   const { data, error, isLoading, refetch } = useQuery({
//     queryKey: ['activityList'],
//     queryFn: fetchMyActivities,
//   });

//   const handleDeleteSuccess = () => {
//     refetch(); // 삭제 성공 시 데이터 다시 불러오기
//   };

//   if (isLoading) return <div>로딩중...</div>;
//   if (error) return <div>오류 발생: {error.message}</div>;

//   const activities = data || [];

//   return (
//     <div>
//   <SectionTitle
//     title='내 체험 관리'
//     action={<LinkButton href='/mypage/my-activities/add-activity'>체험 등록하기</LinkButton>}
//   />

//   <div className='flex flex-col gap-6 md:gap-4'>
//     {activities.map(activity => (
//       <ActivityCard
//         key={activity.id}
//         type='activity'
//         data={activity as ActivityType}
//         onDeleteSuccess={handleDeleteSuccess}
//       />
//     ))}
//   </div>
// </div>
//   );
// };

// export default MyActivitiesPage;

import MyActivitiesClient from './MyActivitiesClient';

const MyActivitiesPage = () => {
  return <MyActivitiesClient />;
};
export default MyActivitiesPage;
