interface CategoryMenuProps {
  categories?: string[];
  selected: string | null;
  onChange: (category: string | null) => void;
}

const DEFAULT_CATEGORIES = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

const CategoryMenu = ({
  categories = DEFAULT_CATEGORIES,
  selected = null,
  onChange,
}: CategoryMenuProps) => {
  const handleClick = (category: string) => {
    if (selected === category) {
      // 이미 선택된 버튼 클릭 시 해제
      onChange(null);
    } else {
      onChange(category);
    }
  };

  return (
    <>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`text-md rounded-full border px-4 py-2 transition-colors md:text-base ${
            selected === category
              ? 'border-primary bg-primary text-white'
              : 'border-gray-300 bg-white text-black hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </>
  );
};

export default CategoryMenu;
