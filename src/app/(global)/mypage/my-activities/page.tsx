'use client';
import { useQuery } from '@tanstack/react-query';

import ActivityCard from '@/app/(global)/mypage/components/ActivityCard';
import { LinkButton } from '@/components/ui/LinkButton';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { Activities, ActivityType } from '@/types/schema/activitiesSchema';
import fetchClientData from '@/utils/api-client/fetchClientData';
import { validateApiResponse } from '@/utils/api-validation';

const fetchMyActivities = async () => {
  const response = await fetchClientData('/my-activities?size=20');
  const validatedData = validateApiResponse(response, Activities);
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
        action={<LinkButton href='/mypage/my-activities/add-activity'>체험 등록하기</LinkButton>}
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
