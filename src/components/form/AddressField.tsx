import debounce from '@/utils/debounce';
import { useState } from 'react';

const AddressField = () => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchAddress = async (query: string) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
    );
    const data = await res.json();
    setResults(data);
  };

  const debouncedSearchAddress = debounce(searchAddress);

  return (
    <>
      <input
        type='text'
        value={value}
        readOnly
        onClick={() => setIsOpen(true)}
        placeholder='주소를 선택하세요'
        className='w-full rounded border px-3 py-2'
      />

      {isOpen && (
        <div className='fixed top-16 left-0 z-10 w-96 rounded border bg-white p-4 shadow-lg'>
          <button onClick={() => setIsOpen(false)}>닫기</button>
          <input
            type='text'
            placeholder='주소 검색'
            className='mb-2 w-full rounded border px-2 py-1'
            onChange={e => debouncedSearchAddress(e.target.value)}
          />

          <ul className='max-h-60 overflow-auto'>
            {results.map((r, i) => (
              <li
                key={i}
                className='cursor-pointer rounded px-2 py-1 hover:bg-gray-100'
                onClick={() => {
                  setValue(r.display_name);
                  setIsOpen(false);
                }}
              >
                {r.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AddressField;
