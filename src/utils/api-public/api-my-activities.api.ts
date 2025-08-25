import { MyActivitiesDto, SignUpResponseDto } from "./api";
import { REQUEST_URL, tokenTmp } from "./api-public";

const URL: string = `${REQUEST_URL}/my-activities`

// 임시 토큰값. 차후에 수정해야함
const token: string = tokenTmp;

export async function FindAllMyActivities(activityId: number, year: number, month: number): Promise<{ status: number, body: MyActivitiesDto[] | { message: string } }> {

  const response = await fetch(
    `${URL}/${activityId}/reservation-dashboard?year=${year}&month=${String(month).padStart(2, '0')}`,
    {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
    },
  )
    .catch((err) => {
      console.log("api-my-activities.api.ts SignUpByEmail error : ", err)
      return err
    })
    .finally(() => console.log("api-my-activities.api.ts SignUpByEmail request finish"))

  // 서버의 응답값 코드
  const status: number = response.status

  // 서버의 body값
  let body: any = null;

  if (!response.ok) {
    console.error('API 호출 실패:', response);
    body = await response.json();
  } else {
    body = await response.json() as unknown as SignUpResponseDto;
  }


  return {
    status,
    body,
  }
}
