const formatPrice = (value: string | number) => {
  const isString = typeof value === 'string';
  const price = isString ? Number(value.replaceAll(',', '')) : value;
  const formatValue = isNaN(price) ? '0' : price.toLocaleString('ko-KR');
  return formatValue;
};

export default formatPrice;
