import { Suspense } from 'react';
import MyReservationsContent from './MyReservationsContent';

const MyReservationsPage = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MyReservationsContent />
    </Suspense>
  );
};
export default MyReservationsPage;
