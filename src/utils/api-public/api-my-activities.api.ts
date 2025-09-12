import { MyActivitiesDto } from './api';
import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';

import fetchClientData from '@/utils/api-client/fetchClientData';

// 타입 안전한 에러 처리 헬퍼 함수
const getErrorStatus = (error: unknown): number => {
  if (error && typeof error === 'object' && 'status' in error) {
    const statusValue = (error as { status: unknown }).status;
    return typeof statusValue === 'number' ? statusValue : 500;
  }
  return 500;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'API 호출 실패';
};
export async function FindAllMyActivities(
  activityId: number,
  year: number,
  month: number,
): Promise<{ status: number; body: MyActivitiesDto[] | { message: string } | null }> {
  try {
    const response = await fetchClientData(
      `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${String(month).padStart(2, '0')}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return {
      status: 200,
      body: response as MyActivitiesDto[],
    };
  } catch (error: unknown) {
    return {
      status: getErrorStatus(error),
      body: { message: getErrorMessage(error) },
    };
  }
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
  try {
    const response = await fetchClientData(
      `/my-activities/${activityId}/reserved-schedule?date=${date}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return {
      status: 200,
      body: response as {
        scheduleId: number;
        startTime: string;
        endTime: string;
        count: {
          declined: number;
          confirmed: number;
          pending: number;
        };
      }[],
    };
  } catch (error: unknown) {
    return {
      status: getErrorStatus(error),
      body: null,
    };
  }
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
  try {
    const response = await fetchClientData(
      `/my-activities/${activityId}/reservations?${!coursorId ? '' : 'coursorId=' + coursorId}&size=${size}&scheduleId=${scheduleId}&status=${statusType}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      status: 200,
      body: response as {
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
      },
    };
  } catch (error: unknown) {
    return {
      status: getErrorStatus(error),
      body: null,
    };
  }
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
  try {
    const response = await fetchClientData(
      `/my-activities/${activityId}/reservations/${reservationId}`,
      {
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: myActivitiesStatus,
        }),
      },
    );
    return {
      status: 200,
      body: response as {
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
    };
  } catch (error: unknown) {
    return {
      status: getErrorStatus(error),
      body: null,
    };
  }
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
  try {
    const response = await fetchClientData(
      `/my-activities?size=${size}${cursorId ? '&cursorId=' + cursorId : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      status: 200,
      body: response as {
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
      },
    };
  } catch (error: unknown) {
    return {
      status: getErrorStatus(error),
      body: null,
    };
  }
}
