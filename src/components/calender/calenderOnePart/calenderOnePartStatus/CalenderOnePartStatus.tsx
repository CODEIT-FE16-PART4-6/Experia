type Props = {
  status: string;
  num: number;
};

const CalenderOnePartStatus = ({ status, num }: Props) => {
  let label: string = '';
  let styleCss: string = '';

  if (num > 0) {
    switch (status) {
      case 'completed':
        label = '완료';
        styleCss = 'bg-[#DDDDDD] text-[#4B4B4B]';
        break;
      case 'confirmed':
        label = '확정';
        styleCss = 'bg-[#FFF4E8] text-[#FF7C1D]';
        break;
      case 'pending':
        label = '예약';
        styleCss = 'bg-[#0085ff] text-white';
        break;
      case 'leftover':
        label = '잔여';
        styleCss = 'bg-[#FFFFFF] text-[#0085FF]';
      default:
        label = '완료';
        styleCss = 'bg-red-100';
    }
  } else if (status == 'not-use') {
    return (
      <div
        className={`h-[23px] w-full rounded-[4px] text-center`}
        style={{ visibility: 'hidden' }}
      ></div>
    );
  } else {
    return null;
  }

  return (
    <div
      className={`h-[23px] w-full rounded-[4px] text-center ${styleCss}`}
    >{`${label} ${num}`}</div>
  );
};

export default CalenderOnePartStatus;
