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
    <div className='relative'>
      <p className='absolute top-[-8px] left-[10px] flex h-[17px] w-[37px] items-center justify-center bg-[#fafafa] text-[14px] font-normal text-[#112211]'>
        체험명
      </p>

      <select
        className='h-[56px] w-full border border-black bg-white pl-[10px] text-[16px] font-normal'
        onChange={e => handleOnChange(Number(e.target.value))}
      >
        {list.map(ele => (
          <option key={ele.id} value={ele.id}>
            {ele.activityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMyActivity;
