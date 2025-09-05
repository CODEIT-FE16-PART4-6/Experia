const formatPrice = (value: string | number | null | undefined) => {
  const isString = typeof value === 'string';

  // null | undefined = '0'으로 처리
  if (value === null || value === undefined) return '0';

  const price = isString ? Number(value.replaceAll(',', '')) : value;
  const formatValue = isNaN(price) ? '0' : price.toLocaleString('ko-KR');

  return formatValue;
};

export default formatPrice;
