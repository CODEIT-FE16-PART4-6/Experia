import { JSX } from 'react';

type Props = {
  list: { id: number; activityName: string }[];
  onChange: (id: number) => void;
};

const SelectMyActivity = ({ list, onChange }: Props) => {
  console.log('SelectMyActivity list : ', list);

  const arr: JSX.Element[] = [];

  // useEffect(() => {
  //   if (Array.isArray(list) && list.length > 0) {
  //     onChange(list[0].id);
  //   }
  // }, [list, onChange]);

  const handleOnChange = (id: number = 0) => {
    console.log('SelectMyActivity handleOnChange id : ', id);
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
