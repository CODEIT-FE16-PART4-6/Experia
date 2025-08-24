import './CalenderArrow.model.css';
type Props = {
  year: number;
  month: number;
  onClick: (add: boolean) => void;
};

const CalenderArrow = ({ year, month, onClick }: Props) => {
  return (
    <div className='CalenderArrow'>
      <div className='btn' onClick={() => onClick(false)}>{`<<`}</div>
      <div>{`${year}년 ${month + 1}월`}</div>
      <div className='btn' onClick={() => onClick(true)}>{`>>`}</div>
    </div>
  );
};

export default CalenderArrow;
