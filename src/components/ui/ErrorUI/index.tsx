'use client';

const ErrorUI = ({ error }: { error: Error }) => {
  return <div>에러가 발생했습니다: {error.message}</div>;
};

export default ErrorUI;
