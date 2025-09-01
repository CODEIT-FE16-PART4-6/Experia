import Image from 'next/image';
import SectionTitle from '@/components/ui/Section/SectionTitle';
import { LinkButton } from '@/components/ui/LinkButton';
import { fetchServerData } from '@/utils/api-server';
import { Activities } from '@/types/schema/activitiesSchema';

const fetchMyActivities = async ({ page, size }: { page: number; size: number }) => {
  const data = await fetchServerData<Activities>({
    path: '/my-activities',
    query: { method: 'cursor', page, size },
    renderType: 'ssr',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ1NSwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjcwMjA3NSwiZXhwIjoxNzU3OTExNjc1LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.gQpOm9em8mJEAgO3LYli_aOfi1LmUHtFDTQck_jCVdY',
  });

  return data;
};

const MyActivitiesPage = async () => {
  const initialData = await fetchMyActivities({ page: 1, size: 3 });

  return (
    <div>
      <SectionTitle
        title='내 체험 관리'
        action={<LinkButton href='/mypage/my-activities/add-activity'>체험 등록하기</LinkButton>}
      />

      <ul>
        {initialData.activities.map(data => (
          <li key={data.id}>
            <figure>
              <Image
                src={data.bannerImageUrl}
                alt={data.title}
                width={204}
                height={204}
                className='aspect-square object-cover'
              />
            </figure>
            <span>
              {data.rating} ({data.reviewCount})
            </span>
            <h4 className='font-bold'>{data.title}</h4>
            <h3>₩{data.price} / 인</h3>
            <LinkButton href={`/mypage/my-activities/edit-activity/${data.id}`}>
              수정하기
            </LinkButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyActivitiesPage;
