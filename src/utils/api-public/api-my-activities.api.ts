import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';
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
        Authorization: `Bearer ${token}`,
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

export async function FindAllMyActivitiesOneDay(activityId: number, date: string): Promise<{
  status: number,
  body: {
    "scheduleId": number,
    "startTime": string,
    "endTime": string,
    "count": {
      "declined": number,
      "confirmed": number,
      "pending": number
    }
  }[]
}> {
  const response1 = await fetch(
    `${URL}/${activityId}/reserved-schedule?date=${date}`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    },
  )
    .catch(err => {
      console.log('api-my-activities.api.ts SignUpByEmail error : ', err);
      return err;
    })
    .finally(() => console.log('api-my-activities.api.ts SignUpByEmail request finish'));
  console.log('response : ', response1);

  // 서버의 응답값 코드
  const status: number = response1.status;

  // 서버의 body값
  let body: any = null;

  if (!response1.ok) {
    console.error('API 호출 실패:', response1);
    body = await response1.json();
  } else {
    body = (await response1.json())
  }


  return {
    status,
    body,
  };
}

export async function FindAllMyActivitiesOnePart(activityId: number, scheduleId: number, size: number, coursorId?: number, statusType: MyActivitiesStatus = MyActivitiesStatus.pending): Promise<{
  status: number,
  body: {
    "reservations": [
      {
        "id": number,
        "status": MyActivitiesStatus,
        "totalPrice": number,
        "headCount": number,
        "nickname": string,
        "userId": number,
        "date": string,
        "startTime": string,
        "endTime": string,
        "createdAt": string,
        "updatedAt": string,
        "activityId": number,
        "scheduleId": number,
        "reviewSubmitted": boolean,
        "teamId": string
      }
    ],
    "totalCount": number,
    "cursorId": number
  }
}> {
  const response1 = await fetch(
    `${URL}/${activityId}/reservations?${!coursorId ? '' : 'coursorId=' + coursorId}&size=${size}&scheduleId=${scheduleId}&status=${statusType}`,
    {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    },
  )
    .catch(err => {
      console.log('api-my-activities.api.ts SignUpByEmail error : ', err);
      return err;
    })
    .finally(() => console.log('api-my-activities.api.ts SignUpByEmail request finish'));
  console.log('response : ', response1);

  // 서버의 응답값 코드
  const status: number = response1.status;

  // 서버의 body값
  let body: any = null;

  if (!response1.ok) {
    console.error('API 호출 실패:', response1);
    body = await response1.json();
  } else {
    body = (await response1.json())
  }


  return {
    status,
    body,
  };
}

export async function UpdateMyActivitiesReserveOneByReservationId(activityId: number, reservationId: number, myActivitiesStatus: MyActivitiesStatus = MyActivitiesStatus.confirmed): Promise<{
  status: number,
  body: {
    "id": number,
    "status": MyActivitiesStatus,
    "totalPrice": number,
    "headCount": number,
    "nickname": string,
    "userId": number,
    "date": string,
    "startTime": string,
    "endTime": string,
    "createdAt": string,
    "updatedAt": string,
    "activityId": number,
    "scheduleId": number,
    "reviewSubmitted": boolean,
    "teamId": string
  }
}> {
  console.log("URL : ", URL)
  const response1 = await fetch(
    `${URL}/${activityId}/reservations/${reservationId}`,
    {
      method: 'PATCH',
      headers: new Headers({
        'accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify({
        status: myActivitiesStatus
      })
    },
  )
    .catch(err => {
      console.log('api-my-activities.api.ts UpdateMyActivitiesReserveOneByReservationId error : ', err);
      return err;
    })
    .finally(() => console.log('api-my-activities.api.ts UpdateMyActivitiesReserveOneByReservationId request finish'));
  console.log('response : ', response1);

  // 서버의 응답값 코드
  const status: number = response1.status;

  // 서버의 body값
  let body: any = null;

  if (!response1.ok) {
    console.error('API 호출 실패:', response1);
    body = await response1.json();
  } else {
    body = (await response1.json())
  }


  return {
    status,
    body,
  };
}

export async function FindAllMyActivitiesData(size: number = 1000, cursorId?: number): Promise<{
  status: number,
  body: {
    "activities": [
      {
        "id": number,
        "userId": number,
        "title": string,
        "description": string,
        "category": string,
        "price": number,
        "address": string,
        "bannerImageUrl": string,
        "rating": number,
        "reviewCount": number,
        "createdAt": string,
        "updatedAt": string
      }
    ],
    "totalCount": number,
    "cursorId"?: number
  }

}> {
  const response1 = await fetch(
    `${URL}?size=${size}${cursorId ? '&cursorId=' + cursorId : ''}`,
    {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    },
  )
    .catch(err => {
      console.log('api-my-activities.api.ts FindAllMyActivitiesData error : ', err);
      return err;
    })
    .finally(() => console.log('api-my-activities.api.ts FindAllMyActivitiesData request finish'));
  console.log('FindAllMyActivitiesData response : ', response1);

  // 서버의 응답값 코드
  const status: number = response1.status;

  // 서버의 body값
  let body: any = null;

  if (!response1.ok) {
    console.error('API 호출 실패:', response1);
    body = await response1.json();
  } else {
    body = (await response1.json())
  }


  return {
    status,
    body,
  };
}
