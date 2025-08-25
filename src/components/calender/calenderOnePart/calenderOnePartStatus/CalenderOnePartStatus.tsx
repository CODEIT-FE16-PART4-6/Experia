import './CalenderOnePartStatus.model.css';

type Props = {
  className: string;
  status: string;
  num: number;
};

const CalenderOnePartStatus = ({ className = '', status, num }: Props) => {
  let label: string = '';

  if (num > 0) {
    switch (status) {
      case 'completed':
        label = '완료';
        break;
      case 'confirmed':
        label = '승인';
        break;
      case 'pending':
        label = '예약';
        break;
      default:
        label = '완료';
    }
  } else if (status == 'not-use') {
    return <div className={`status`} style={{ visibility: 'hidden' }}></div>;
  } else {
    return null;
  }

  return <div className={`status ${label}`}>{`${label} ${num}`}</div>;
};

export default CalenderOnePartStatus;
