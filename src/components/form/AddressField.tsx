import debounce from '@/utils/debounce';
import { useState, forwardRef, useMemo, InputHTMLAttributes } from 'react';

interface AddressFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const AddressField = forwardRef<HTMLInputElement, AddressFieldProps>(
  ({ value: propValue, onChange, placeholder, ...rest }, ref) => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const searchAddress = async (query: string) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data);
    };

    const debouncedSearchAddress = useMemo(() => debounce(searchAddress), []);

    const handleSelect = (selected: string) => {
      onChange?.(selected); // form state에 반영
      setIsOpen(false);
      setSearchValue(''); // 검색창 초기화
      setResults([]);
    };

    return (
      <>
        <input
          ref={ref}
          type='text'
          value={propValue || ''}
          readOnly
          onClick={() => setIsOpen(true)}
          placeholder='주소를 입력해주세요'
          className='w-full rounded border px-3 py-2'
          {...rest}
        />

        {isOpen && (
          <div className='fixed top-1/2 left-1/2 z-10 w-96 -translate-x-1/2 -translate-y-1/2 rounded border bg-white p-4 shadow-lg'>
            <button onClick={() => setIsOpen(false)}>닫기</button>
            <input
              type='text'
              placeholder='주소 검색'
              className='mb-2 w-full rounded border px-2 py-1'
              onChange={e => {
                setSearchValue(e.target.value);
                debouncedSearchAddress(e.target.value);
              }}
            />

            <ul className='max-h-60 overflow-auto'>
              {results.map((r, i) => (
                <li
                  key={i}
                  className='cursor-pointer rounded px-2 py-1 hover:bg-gray-100'
                  onClick={() => {
                    handleSelect(r.display_name);
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
  },
);

export default AddressField;
