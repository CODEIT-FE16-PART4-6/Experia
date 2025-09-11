'use client';
// import { DropdownSelect, Activity } from '@/components/DropdownSelect';
import { DropdownMeatball } from '@/components/DropdownMeatball';

// {/* UI 컴포넌트 테스트 페이지 */}

const TestPage = () => {
  //셀렉트 관련 상태와 함수
  // const [selectedActivityId, setSelectedActivityId] = useState<Activity | null>(null);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null); // 선택된 activity 객체 또는 null
  // selectedActivityId가 변경될 때 selectedActivity 업데이트

  //미트볼 관련 함수
  const handleEdit = () => {
    alert('수정하기 선택됨');
  };

  const handleDelete = () => {
    alert('삭제 선택됨');
  };

  return (
    <div>
      <h3>DropdownSelect 컴포넌트</h3>
      {/* <DropdownSelect
        activities={activities}
        placeholder='카테고리'
        value={selectedActivity}
        onChange={handleSelectId}
      /> */}
      <h3>DropdownMeatball 컴포넌트</h3>
      <DropdownMeatball onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TestPage;
