import CalenderPage from '@/components/calender/Calender';
import SectionTitle from '@/components/ui/Section/SectionTitle';

const ReservationPage = () => {
  return (
    <div>
      <SectionTitle title='예약 현황' />
      <CalenderPage />
    </div>
  );
};

export default ReservationPage;
