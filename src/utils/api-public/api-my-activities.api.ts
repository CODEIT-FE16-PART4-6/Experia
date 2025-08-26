import { REQUEST_URL, tokenTmp } from '.';
import { MyActivitiesDto, SignUpResponseDto } from './api';
// import { REQUEST_URL, tokenTmp } from "./index.ts";

const URL: string = `${REQUEST_URL}/my-activities`;

// 임시 토큰값. 차후에 수정해야함
const token: string = tokenTmp;

export async function FindAllMyActivities(
  activityId: number,
  year: number,
  month: number,
): Promise<{ status: number; body: MyActivitiesDto[] | { message: string } }> {
  const response = await fetch(
    `${URL}/${activityId}/reservation-dashboard?year=${year}&month=${String(month).padStart(2, '0')}`,
    {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQ3MCwidGVhbUlkIjoiMTYtNCIsImlhdCI6MTc1NjEyNDM0NywiZXhwIjoxNzU3MzMzOTQ3LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.Yi-_nIWQwIyS4GVOBfGRBOupd6I86iuWvx4PV5KLkLY`,
      }),
    },
  )
    .catch(err => {
      console.log('api-my-activities.api.ts SignUpByEmail error : ', err);
      return err;
    })
    .finally(() => console.log('api-my-activities.api.ts SignUpByEmail request finish'));
  console.log('response : ', response);

  // 서버의 응답값 코드
  const status: number = response.status;

  // 서버의 body값
  let body: any = null;

  if (!response.ok) {
    console.error('API 호출 실패:', response);
    body = await response.json();
  } else {
    body = (await response.json()) as unknown as SignUpResponseDto;
  }

  return {
    status,
    body,
  };
}
