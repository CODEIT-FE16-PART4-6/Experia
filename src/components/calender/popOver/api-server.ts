'use server';
import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';
import { REQUEST_URL } from '@/utils/api-public';

const URL: string = `${REQUEST_URL}/my-activities`;

export async function UpdateServerMyActivitiesReserveOneByReservationId(
  activityId: number,
  reservationId: number,
  myActivitiesStatus: MyActivitiesStatus = MyActivitiesStatus.confirmed,
  accessToken?: string,
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
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
