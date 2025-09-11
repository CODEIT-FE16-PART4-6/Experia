'use server';
import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';
import { REQUEST_URL, tokenTmp } from '@/utils/api-public';

const URL: string = `${REQUEST_URL}/my-activities`;

const _token: string = tokenTmp;

export async function UpdateServerMyActivitiesReserveOneByReservationId(
  activityId: number,
  reservationId: number,
  myActivitiesStatus: MyActivitiesStatus = MyActivitiesStatus.confirmed,
): Promise<{
  status: number;
  body: {
    id: number;
    status: MyActivitiesStatus;
    totalPrice: number;
    headCount: number;
    nickname: string;
    userId: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    activityId: number;
    scheduleId: number;
    reviewSubmitted: boolean;
    teamId: string;
  } | null;
}> {
  const response1 = await fetch(`${URL}/${activityId}/reservations/${reservationId}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUwMCwidGVhbUlkIjoiMTYtNiIsImlhdCI6MTc1NjQ0NzU3NiwiZXhwIjoxNzU3NjU3MTc2LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.AZGJJNrRA_ccUa0w2qJm3RneEzMp7RMLu4SxkP0pOSE`,
    }),
    body: JSON.stringify({
      status: myActivitiesStatus,
    }),
  }).catch(err => {
    return err;
  });

  const status: number = response1.status;

  let body: {
    id: number;
    status: MyActivitiesStatus;
    totalPrice: number;
    headCount: number;
    nickname: string;
    userId: number;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    activityId: number;
    scheduleId: number;
    reviewSubmitted: boolean;
    teamId: string;
  } | null = null;

  if (!response1.ok) {
    body = await response1.json();
  } else {
    body = await response1.json();
  }

  return {
    status,
    body,
  };
}
