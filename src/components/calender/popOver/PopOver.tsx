'use client';

import '@/app/globals.css';

import React, { useEffect, useState } from 'react';

import UpdateReserveStatus from './updateReserveStatus/UpdateReserveStatus';
import PopOverCurrentData from './utils/PopOver.function';
import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';
import { UpdateMyActivitiesReserveOneByReservationId } from '@/utils/api-public/api-my-activities.api';


type Props = {
  activityId: number;
  date: string;
};

const PopOver = ({ activityId, date }: Props) => {
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
  const [activeStatus, setActiveStatus] = useState<MyActivitiesStatus>(MyActivitiesStatus.pending);

  const arrayDate: string[] = date.split('-');

  const onClickConfirm = async (id: number) => {
    await UpdateMyActivitiesReserveOneByReservationId(activityId, id, MyActivitiesStatus.confirmed);
    setUpdate(update + 1);
  };

  const onClickDeclined = async (id: number) => {
    await UpdateMyActivitiesReserveOneByReservationId(activityId, id, MyActivitiesStatus.declined);
    setUpdate(update + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await PopOverCurrentData(activityId, date);
      setCurrentData(data);

      const keys = Object.keys(data.todayData);
      const optionsData: React.JSX.Element[] = keys.map(ele => (
        <option key={ele} value={ele}>
          {ele}
        </option>
      ));
      setSelectedOptions(optionsData);

      if (keys.length > 0) {
        const arrValues: React.JSX.Element[] = [];
        const dataValue = data.todayData[keys[0]];
        const val = dataValue
          .filter(ele => ele.status == status)
          .map(ele =>
            UpdateReserveStatus({
              id: ele.id,
              nickname: ele.nickname,
              headCount: ele.headCount,
              needBtn: ele.status == MyActivitiesStatus.pending,
              type: ele.status,
              onClickConfirm,
              onClickDeclined,
            }),
          );
        if (val.length > 0) val.forEach(ele => arrValues.push(ele));
        setSelectedValues(arrValues);
        setSelectedKey(keys[0]);
      } else {
        setSelectedKey('');
      }
    };

    fetchData();
  }, [activityId, date, update, onClickConfirm, onClickDeclined, status]);

  const onClickStatus = (statusSet: MyActivitiesStatus) => {
    setStatus(statusSet);
    setActiveStatus(statusSet);

    if (currentData[statusSet] > 0) {
      const arrValues: React.JSX.Element[] = [];
      const dataValue = currentData.todayData[selectedKey] ?? [];
      const val = dataValue
        .filter(ele => ele.status == statusSet)
        .map(ele =>
          UpdateReserveStatus({
            id: ele.id,
            nickname: ele.nickname,
            headCount: ele.headCount,
            needBtn: ele.status == MyActivitiesStatus.pending,
            type: ele.status,
            onClickConfirm,
            onClickDeclined,
          }),
        );
      if (val.length > 0) val.forEach(ele => arrValues.push(ele));
      setSelectedValues(arrValues);
    } else {
      setSelectedValues([]);
    }
  };

  const onChangeOption = (value: string) => {
    if ((currentData.todayData[value] ?? []).length > 0) {
      const arrValues: React.JSX.Element[] = [];
      const dataValue = currentData.todayData[value];
      const val = dataValue
        .filter(ele => ele.status == status)
        .map(ele =>
          UpdateReserveStatus({
            id: ele.id,
            nickname: ele.nickname,
            headCount: ele.headCount,
            needBtn: ele.status == MyActivitiesStatus.pending,
            type: ele.status,
            onClickConfirm,
            onClickDeclined,
          }),
        );
      if (val.length > 0) val.forEach(ele => arrValues.push(ele));
      setSelectedValues(arrValues);
      setSelectedKey(value);
    }
  };

  // 공통 버튼 베이스 클래스 (기존 .btn 대체)
  const baseBtn =
    'appearance-none bg-transparent m-0 mx-2.5 text-xl font-normal outline-none' +
    ' border-b border-b-transparent transition-[border-color,font-weight] cursor-pointer';
  const activeBtn = 'border-b-[3px] border-black font-semibold';
  const hoverBtn = 'hover:border-b-[3px] hover:border-black hover:font-semibold';

  return (
    <div className='m-4'>
      <h3 className='text-2xl font-bold'>예약 정보</h3>

      <div className='border-b border-dotted border-black'>
        <button
          type='button'
          className={`${baseBtn} ${hoverBtn} ${
            activeStatus === MyActivitiesStatus.pending ? activeBtn : ''
          }`}
          onClick={() => onClickStatus(MyActivitiesStatus.pending)}
        >
          신청 {currentData.pending}
        </button>

        <button
          type='button'
          className={`${baseBtn} ${hoverBtn} ${
            activeStatus === MyActivitiesStatus.confirmed ? activeBtn : ''
          }`}
          onClick={() => onClickStatus(MyActivitiesStatus.confirmed)}
        >
          승인 {currentData.confirmed}
        </button>

        <button
          type='button'
          className={`${baseBtn} ${hoverBtn} ${
            activeStatus === MyActivitiesStatus.declined ? activeBtn : ''
          }`}
          onClick={() => onClickStatus(MyActivitiesStatus.declined)}
        >
          거절 {currentData.declined}
        </button>
      </div>

      <p className='mt-3 text-xl font-semibold'>예약 날짜</p>
      <p className='text-xl font-normal'>{`${arrayDate[0]}년 ${arrayDate[1]}월 ${arrayDate[2]}일`}</p>

      <select
        name='select-item'
        onChange={e => onChangeOption(e.target.value)}
        className='mt-2 h-14 w-full rounded border border-gray-300 px-3 text-base font-normal'
      >
        {options}
      </select>

      <p className='mt-4 text-xl font-semibold'>예약내역</p>
      {values}
    </div>
  );
};

export default PopOver;
