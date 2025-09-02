import { MyActivitiesStatus } from '@/types/schema/activitiesSchema';

type Props = {
  id: number;
  nickname: string;
  headCount: number;
  needBtn: boolean;
  type: MyActivitiesStatus;
  onClickConfirm: (id: number) => void;
  onClickDeclined: (id: number) => void;
};

const UpdateReserveStatus = ({
  id,
  nickname,
  headCount,
  needBtn,
  type,
  onClickConfirm,
  onClickDeclined,
}: Props) => {
  return (
    <div key={id} className='mx-6 my-5 border border-dotted border-black px-4 pb-3'>
      <p>
        <span className='text-base font-semibold text-[#79747e]'>닉네임</span>{' '}
        <span className='text-base font-medium text-[#1b1b1b]'>{nickname}</span>
      </p>
      <p>
        <span className='text-base font-semibold text-[#79747e]'>인원</span>{' '}
        <span className='text-base font-medium text-[#1b1b1b]'>{headCount}</span>
      </p>

      {needBtn ? (
        <div className='mt-2 flex w-full justify-end gap-2.5'>
          <button
            onClick={() => onClickConfirm(id)}
            className='rounded-lg bg-[#0b1d0d] px-4 py-2 text-base font-bold text-white transition-colors hover:bg-[#13381a]'
          >
            승인하기
          </button>
          <button
            onClick={() => onClickDeclined(id)}
            className='rounded-lg border-2 border-black bg-white px-4 py-2 text-base font-bold text-black transition-colors hover:bg-[#f3f3f3]'
          >
            거절하기
          </button>
        </div>
      ) : type === MyActivitiesStatus.confirmed ? (
        <div className='flex'>
          <button className='ml-auto rounded-full bg-[#fff4e9] px-6 py-2 text-lg font-bold text-orange-500 shadow-sm transition hover:bg-[#FFF4E8]'>
            예약 승인
          </button>
        </div>
      ) : (
        <div className='flex'>
          <button className='ml-auto rounded-full bg-[#fff4e9] px-6 py-2 text-lg font-bold text-orange-500 shadow-sm transition hover:bg-[#FFE4E0]'>
            예약 거절
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateReserveStatus;
