'use client';
// import { DropdownSelect, Activity } from '@/components/DropdownSelect';
import { DropdownMeatball } from '@/components/DropdownMeatball';
import Button from '@/components/Button';

// {/* UI 컴포넌트 테스트 페이지 */}

const activities = [
  { id: 1, name: '문화/예술' },
  { id: 2, name: '스포츠' },
  { id: 3, name: '투어' },
];
const TestPage = () => {
  //셀렉트 관련 상태와 함수
  // const [selectedActivityId, setSelectedActivityId] = useState<Activity | null>(null);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null); // 선택된 activity 객체 또는 null
  // selectedActivityId가 변경될 때 selectedActivity 업데이트
  const handleSelectId = (id: number) => {
    const activity = activities.find(activity => activity.id === id);
    // setSelectedActivityId(activity || null); // activity가 없으면 null을 설정
    // setSelectedActivity(activity || null);
  };

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
