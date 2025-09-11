import { JSX } from 'react';

type Props = {
  list: { id: number; activityName: string }[];
  onChange: (id: number) => void;
};

const SelectMyActivity = ({ list, onChange }: Props) => {
  const arr: JSX.Element[] = [];

  const handleOnChange = (id: number = 0) => {
    if (id > 0) {
      onChange(id);
    }
  };

  list.forEach(ele => {
    arr.push(
      <option key={ele.id} value={ele.id}>
        {ele.activityName}
      </option>,
    );
  });

  return (
    <>
      <select onChange={e => handleOnChange(Number(e.target.value))}>{arr}</select>
    </>
  );
};

export default SelectMyActivity;
