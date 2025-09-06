'use client';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { LinkButton } from '@/components/ui/LinkButton';
import ActivityCard from '../components/ActivityCard';
import { Activities, ActivityType } from '@/types/schema/activitiesSchema';
import { useQuery } from '@tanstack/react-query';

const fetchMyActivities = async () => {
  const response = await fetch('https://sp-globalnomad-api.vercel.app/16-6/my-activities?size=20', {
    method: 'GET',
    headers: {
      //임시 토큰값
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjI4MzI1NSwiZXhwIjoxNzU3NDkyODU1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.7f4EC3wcK_Zzpys7mDlyXshKz5MX-2mdlZ12gOrVoJA', //Bearer 뒤에 토큰 붙여서 전송
      'Content-Type': 'application/json', // 서버가 JSON 형식 데이터를 기대하는 경우
    },
  });
  const data = await response.json();
  const validatedData = Activities.parse(data);
  return validatedData.activities;
};

const MyActivitiesPage = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['activityList'],
    queryFn: fetchMyActivities,
  });

  const handleDeleteSuccess = () => {
    refetch(); // 삭제 성공 시 데이터 다시 불러오기
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  const activities = data || [];

  return (
    <div>
      <SectionTitle
        title='내 체험 관리'
        action={
          <LinkButton href='/mypage/my-activities/add-new-activity'>체험 등록하기</LinkButton>
        }
      />
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          type='activity'
          data={activity as ActivityType}
          onDeleteSuccess={handleDeleteSuccess}
        />
      ))}
    </div>
  );
};

export default MyActivitiesPage;
