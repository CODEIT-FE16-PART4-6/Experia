'use client';

import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';
import { UpdateMyActivitiesReserveOneByReservationId } from '@/utils/api-public/api-my-activities.api';
import React, { useEffect, useState } from 'react';
import UpdateReserveStatus from './updateReserveStatus/UpdateReserveStatus';
import PopOverCurrentData from './utils/PopOver.function';

type Props = {
  activityId: number;
  date: string;
};

const PopOverPage = ({ activityId, date }: Props) => {
  const [currentData, setCurrentData] = useState<{
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
      }[];
    };
  }>({
    pending: 0,
    declined: 0,
    confirmed: 0,
    todayData: {},
  });
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [status, setStatus] = useState<MyActivitiesStatus>(MyActivitiesStatus.pending);
  const [values, setSelectedValues] = useState<React.JSX.Element[]>([]);
  const [options, setSelectedOptions] = useState<React.JSX.Element[]>([]);
  const [update, setUpdate] = useState<number>(0);

  const arrayDate: string[] = date.split('-');

  const onClickConfirm = async (id: number) => {
    console.log('onClickConfirm id : ', id);
    await UpdateMyActivitiesReserveOneByReservationId(activityId, id, MyActivitiesStatus.confirmed);

    setUpdate(update + 1);
  };

  const onClickDeclined = async (id: number) => {
    console.log('onClickDeclined id : ', id);
    await UpdateMyActivitiesReserveOneByReservationId(activityId, id, MyActivitiesStatus.declined);

    setUpdate(update + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await PopOverCurrentData(activityId, date);
      console.log('PopOver.tsx useEffect fetchData data : ', data);
      setCurrentData(data);

      // 첫 번째 key를 초기 선택값으로 설정
      const keys = Object.keys(data.todayData);
      console.log('PopOver.tsx useEffect fetchData keys : ', keys);

      const optionsData: React.JSX.Element[] = keys.map(ele => {
        return (
          <option key={ele} value={ele}>
            {ele}
          </option>
        );
      });

      setSelectedOptions(optionsData);

      if (keys.length > 0) {
        console.log('date.todayDate 0 index values : ', data.todayData);
        const arrValues: React.JSX.Element[] = [];

        console.log('PopOverPage useEffect fetchData status : ', status);
        const dataValue = data.todayData[keys[0]];
        console.log('PopOverPage useEffect fetchData dataValue : ', dataValue);
        const val = dataValue
          .filter(ele => ele.status == status)
          .map(ele => {
            return UpdateReserveStatus({
              id: ele['id'],
              nickname: ele['nickname'],
              headCount: ele['headCount'],
              needBtn: ele['status'] == MyActivitiesStatus.pending,
              onClickConfirm,
              onClickDeclined,
            });
          });

        if (val.length > 0) {
          val.forEach(ele => arrValues.push(ele));
        }

        console.log('arrValues : ', arrValues);

        setSelectedValues(arrValues);
        setSelectedKey(keys[0]);
      } else {
        setSelectedKey('');
      }
    };

    fetchData();
  }, [update]);

  const onClickStatus = (statusSet: MyActivitiesStatus) => {
    setStatus(statusSet);
    console.log('PopOver.tsx onClickStatus statusSet : ', statusSet);
    console.log('갯수 : ', currentData[statusSet]);
    if (currentData[statusSet] > 0) {
      // 첫 번째 key를 초기 선택값으로 설정
      setSelectedKey(selectedKey);
      console.log('date.todayDate 0 index values : ', currentData.todayData);
      const arrValues: React.JSX.Element[] = [];

      console.log('PopOverPage useEffect fetchData status : ', status);
      const dataValue = currentData.todayData[selectedKey];
      console.log('PopOverPage useEffect fetchData dataValue : ', dataValue);
      const val = dataValue
        .filter(ele => ele.status == MyActivitiesStatus[statusSet])
        .map((ele: any) => {
          console.log('update status ele : ', ele);
          return UpdateReserveStatus({
            id: ele['id'],
            nickname: ele['nickname'],
            headCount: ele['headCount'],
            needBtn: ele['status'] == MyActivitiesStatus.pending,
            onClickConfirm,
            onClickDeclined,
          });
        });

      if (val.length > 0) {
        val.forEach(ele => arrValues.push(ele));
      }

      console.log('arrValues : ', arrValues);

      setSelectedValues(arrValues);
    } else {
      setSelectedValues([]);
    }
  };

  const onChangeOption = (value: string) => {
    console.log('onChangeSelectItem run : ', value);
    if (currentData.todayData[value].length > 0) {
      console.log('date.todayDate 0 index values : ', currentData.todayData);
      const arrValues: React.JSX.Element[] = [];

      console.log('PopOverPage useEffect fetchData status : ', status);
      const dataValue = currentData.todayData[value];
      console.log('PopOverPage useEffect fetchData dataValue : ', dataValue);
      const val = dataValue
        .filter(ele => ele.status == status)
        .map((ele: any) => {
          return UpdateReserveStatus({
            id: ele['id'],
            nickname: ele['nickname'],
            headCount: ele['headCount'],
            needBtn: ele['status'] == MyActivitiesStatus.pending,
            onClickConfirm,
            onClickDeclined,
          });
        });

      if (val.length > 0) {
        val.forEach(ele => arrValues.push(ele));
      }

      console.log('arrValues : ', arrValues);

      setSelectedValues(arrValues);
      setSelectedKey(value);
    }
  };

  return (
    <>
      <h1>예약 정보</h1>
      <button value={'신청'} onClick={() => onClickStatus(MyActivitiesStatus.pending)}>
        신청 {currentData.pending}
      </button>
      <button value={'승인'} onClick={() => onClickStatus(MyActivitiesStatus.confirmed)}>
        승인 {currentData.confirmed}
      </button>
      <button value={'거절'} onClick={() => onClickStatus(MyActivitiesStatus.declined)}>
        거절 {currentData.declined}
      </button>
      <p>예약 날짜</p>
      <p>{`${arrayDate[0]}년 ${arrayDate[1]}월 ${arrayDate[2]}일`}</p>
      <select name='select-item' onChange={e => onChangeOption(e.target.value)}>
        {options}
      </select>
      {values}
    </>
  );
};

export default PopOverPage;
