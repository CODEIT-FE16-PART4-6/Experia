type Props = {
  id: number;
  nickname: string;
  headCount: number;
  needBtn: boolean;
  onClickConfirm: (id: number) => void;
  onClickDeclined: (id: number) => void;
};

const UpdateReserveStatus = ({
  id,
  nickname,
  headCount,
  needBtn,
  onClickConfirm,
  onClickDeclined,
}: Props) => {
  return (
    <div key={id}>
      <p>닉네임 : {nickname}</p>
      <p>인원 : {headCount}</p>
      {needBtn ? (
        <>
          <button onClick={() => onClickConfirm(id)}>승인하기</button>
          <button onClick={() => onClickDeclined(id)}>거절하기</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UpdateReserveStatus;
