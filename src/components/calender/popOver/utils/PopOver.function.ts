import { MyActivitiesStatus } from "@/types/schema/activitiesSchema";
import { FindAllMyActivitiesOneDay, FindAllMyActivitiesOnePart } from "@/utils/api-public/api-my-activities.api";

const PopOverCurrentData = async (activityId: number, date: string): Promise<{
  declined: number;
  confirmed: number;
  pending: number;
  todayData: {
    [key: string]: {
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
    }[]
  }
}> => {
  const data1 = await FindAllMyActivitiesOneDay(activityId, date);

  console.log("PopOver.function.ts data1 : ", data1)

  const scheduleIds: number[] = data1.body.map(ele => ele.scheduleId);

  const reservationStatus = [];
  const myActivitiesStatusKeys = Object.keys(MyActivitiesStatus);
  for (let i = 0; i < scheduleIds.length; i++) {
    for (let j = 0; j < myActivitiesStatusKeys.length; j++) {
      const key: MyActivitiesStatus = Object.values(MyActivitiesStatus)[j];
      const res = await FindAllMyActivitiesOnePart(
        activityId,
        scheduleIds[i],
        1000,
        undefined,
        key,
      );

      reservationStatus.push(...res.body.reservations);
    }
  }


  const todayData: {
    [key: string]: {
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
    }[];
  } = {};

  for (let i = 0; i < reservationStatus.length; i++) {
    const oneReservationStatus = reservationStatus[i];
    const key: string = `${oneReservationStatus.startTime} ~ ${oneReservationStatus.endTime}`;
    if (!todayData[key]) {
      todayData[key] = [{ ...oneReservationStatus }];
    } else {
      todayData[key].push({ ...oneReservationStatus });
    }
  }


  return {
    declined: data1.body.reduce(function (a, b) {
      return a + b.count.declined;
    }, 0),
    confirmed: data1.body.reduce(function (a, b) {
      return a + b.count.confirmed;
    }, 0),
    pending: data1.body.reduce(function (a, b) {
      return a + b.count.pending;
    }, 0),
    todayData
  }
}

export default PopOverCurrentData;
