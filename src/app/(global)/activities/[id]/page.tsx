import Post from './post';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getActivities(id: string) {
  const res = await fetch(`https://sp-globalnomad-api.vercel.app/16-6/activities/${id}`);

  if (!res.ok) {
    throw new Error('Fetch 실패');
  }
  const data = await res.json();
  console.log('받아온 데이터:', data);
  return data;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log('id 출력:', id);

  try {
    const data = await getActivities(id);
    console.log(data);

    return <Post data={data} />;
  } catch (error) {
    return (
      <div className='error'>
        <h2>오류가 발생했습니다.</h2>
      </div>
    );
  }
}
