const parsePrice = (value: string): number => {
  const cleaned = value.replace(/[^\d]/g, ''); // 숫자만 남기기
  return cleaned ? parseInt(cleaned, 10) : 0; // 앞부분 0 제거
};

export default parsePrice;
