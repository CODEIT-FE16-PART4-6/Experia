import { cache } from 'react';

import Post from './components/Post';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchActivities(id: string) {
  const res = await fetch(`https://sp-globalnomad-api.vercel.app/16-6/activities/${id}`, {
    next: { revalidate: 300, tags: ['activity'] },
  });

  if (!res.ok) {
    throw new Error('Fetch 실패');
  }
  const data = await res.json();
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
  return data;
}

const initialGetActivity = cache(async (id: string) => {
  return fetchActivities(id);
});

const initialGetReviews = cache(async (id: string) => {
  return fetchReviews(id);
});

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const Postdata = await initialGetActivity(id);
  const reviewData = await initialGetReviews(id);

  return <Post postData={Postdata} reviewData={reviewData} />;
}
