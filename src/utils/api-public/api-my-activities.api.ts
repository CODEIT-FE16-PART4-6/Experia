
import { MyActivitiesDto } from './api';

import { REQUEST_URL, tokenTmp } from '.';
import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';

const URL: string = `${REQUEST_URL}/my-activities`;

const token: string = tokenTmp;

export async function FindAllMyActivities(
  activityId: number,
  year: number,
  month: number,
): Promise<{ status: number; body: MyActivitiesDto[] | { message: string } | null }> {
  const response = await fetch(
    `${URL}/${activityId}/reservation-dashboard?year=${year}&month=${String(month).padStart(2, '0')}`,
    {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    },
  ).catch(err => {
    return err;
  });

  const status: number = response.status;

  let body: MyActivitiesDto[] | { message: string } | null = null;

  if (!response.ok) {
    body = await response.json();
  } else {
    body = (await response.json()) as unknown as MyActivitiesDto[];
  }

  return {
    status,
    body,
  };
}

export async function FindAllMyActivitiesOneDay(
  activityId: number,
  date: string,
): Promise<{
  status: number;
  body:
    | {
        scheduleId: number;
        startTime: string;
        endTime: string;
        count: {
          declined: number;
          confirmed: number;
          pending: number;
        };
      }[]
    | null;
}> {
  const response1 = await fetch(`${URL}/${activityId}/reserved-schedule?date=${date}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  }).catch(err => {
    return err;
  });

  const status: number = response1.status;

  let body:
    | {
        scheduleId: number;
        startTime: string;
        endTime: string;
        count: {
          declined: number;
          confirmed: number;
          pending: number;
        };
      }[]
    | null = null;

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

export async function FindAllMyActivitiesOnePart(
  activityId: number,
  scheduleId: number,
  size: number,
  coursorId?: number,
  statusType: MyActivitiesStatus = MyActivitiesStatus.pending,
): Promise<{
  status: number;
  body: {
    reservations: [
      {
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
      },
    ];
    totalCount: number;
    cursorId: number;
  } | null;
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
  ).catch(err => {
    return err;
  });

  const status: number = response1.status;

  let body: {
    reservations: [
      {
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
      },
    ];
    totalCount: number;
    cursorId: number;
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

export async function UpdateMyActivitiesReserveOneByReservationId(
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
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

export async function FindAllMyActivitiesData(
  size: number = 1000,
  cursorId?: number,
): Promise<{
  status: number;
  body: {
    activities: [
      {
        id: number;
        userId: number;
        title: string;
        description: string;
        category: string;
        price: number;
        address: string;
        bannerImageUrl: string;
        rating: number;
        reviewCount: number;
        createdAt: string;
        updatedAt: string;
      },
    ];
    totalCount: number;
    cursorId?: number;
  } | null;
}> {
  const response1 = await fetch(`${URL}?size=${size}${cursorId ? '&cursorId=' + cursorId : ''}`, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  }).catch(err => {
    return err;
  });

  const status: number = response1.status;

  let body: {
    activities: [
      {
        id: number;
        userId: number;
        title: string;
        description: string;
        category: string;
        price: number;
        address: string;
        bannerImageUrl: string;
        rating: number;
        reviewCount: number;
        createdAt: string;
        updatedAt: string;
      },
    ];
    totalCount: number;
    cursorId?: number;
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
