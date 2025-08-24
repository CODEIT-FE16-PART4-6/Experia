'use client';

import CalenderBoard from './calenderBoard/CalenderBoard';

const CalenderPage = () => {
  return (
    <>
      <h1>Calender Page</h1>
      <CalenderBoard year={2025} month={7} />
    </>
  );
};

export default CalenderPage;
