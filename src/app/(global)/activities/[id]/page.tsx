//import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import Post from './post';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchActivities(id: string) {
  let callCount = 0;
  //*** cache check
  /*
  callCount++;
  console.log(`API 호출 : ${callCount} 
    ID:${id}`); //revalidate 준 만큼의 텀 이후에 이 로그가 다시 실행됨. (만약 새로고침 마다 발생 = 캐싱 안됨)
  const res = await fetch(`https://sp-globalnomad-api.vercel.app/16-6/activities/${id}`);
*/
  const res = await fetch(`https://sp-globalnomad-api.vercel.app/16-6/activities/${id}`, {
    next: { revalidate: 300, tags: ['activity'] },
  });

  if (!res.ok) {
    throw new Error('Fetch 실패');
  }
  const data = await res.json();
  console.log('받아온 데이터:', data);
  return data;
}

async function fetchReviews(id: string) {
  const res = await fetch(`https://sp-globalnomad-api.vercel.app/16-6/activities/${id}/reviews`, {
    next: { revalidate: 300, tags: ['activity_reviews'] },
  });

  if (!res.ok) {
    throw new Error('Fetch 실패');
  }
  const data = await res.json();
  console.log('받아온 데이터:', data);
  return data;
}

//****************캐시에 저장
/*
// fn, keyParts, option
const initialGetActivity = unstable_cache(async (id: string) => fetchActivities(id), ['activity'], {
  revalidate: 300, //5 minute
  tags: ['activity'],
});
*/
const initialGetActivity = cache(async (id: string) => {
  return fetchActivities(id);
});

const initialGetReviews = cache(async (id: string) => {
  return fetchReviews(id);
});

//****************
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log('id 출력:', id);

  try {
    const data = await initialGetActivity(id);
    console.log(data);
    const reviewData = await initialGetReviews(id);

    return <Post data={data} reviewData={reviewData} />;
  } catch (error) {
    console.log(error);
    return (
      <div className='error'>
        <h2>오류가 발생했습니다.</h2>
      </div>
    );
  }
}
