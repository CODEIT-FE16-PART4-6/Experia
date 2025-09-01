export const HELLO = 'hello';

//경로 상수 필요한 상수를 편집하세요 router.push(ROUTES.HOME);//
export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  NOT_FOUND: '*',
};

export const BREAKPOINTS = {
  lg: 1280,
  md: 720,
  sm: 520,
};

export const ITEM_PAGESIZE = {
  lg: 8,
  md: 9,
  sm: 6,
};

export const ITEM_DEFAULT_PAGESIZE = 12; // 목록 렌더링 갯수 기본값: 12개 (반응형 그리드 레이아웃에 맞춤)

export const RESERVATION_STATUS = {
  {
    label: '예약 신청',
    value: 'pending',
  },
  {
    label: '예약 취소',
    value: 'canceled',
  },
  {
    label: '예약 승인',
    value: 'confirmed',
  },
  {
    label: '예약 거절',
    value: 'declined',
  },
  {
    label: '체험 완료',
    value: 'completed',
  },};

export const PATHS = {
  MAIN: '/',
  ACTIVITY_DETAIL: (id: number) => `/activities/${id}`,
  MYPAGE: '/mypage',
  MY_ACTIVITIES: `/mypage/my-activities`,
  MY_RESERVATIONS: '/mypage/my-reservations',
  RESERVATIONS: '/mypage/reservations',
  LOGIN: '/login',
  SIGNUP: '/signup',
};

export const ACTIVITY_CATEGORIES = [
  { id: '1', value: '문화 · 예술' },
  { id: '2', value: '식음료' },
  { id: '3', value: '스포츠' },
  { id: '4', value: '투어' },
  { id: '5', value: '관광' },
  { id: '6', value: '웰빙' },
];
