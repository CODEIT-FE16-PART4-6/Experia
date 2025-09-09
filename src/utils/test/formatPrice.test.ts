import formatPrice from '@/utils/formatPrice';

describe('formatPrice', () => {
  // 숫자가 올바르게 포맷되는지
  test('숫자 값을 한국 통화 형식으로 포맷해야 합니다.', () => {
    expect(formatPrice(1234567)).toBe('1,234,567');
  });

  // 문자열이 올바르게 포맷되는지
  test('문자열 값을 한국 통화 형식으로 포맷해야 합니다.', () => {
    expect(formatPrice('9876543')).toBe('9,876,543');
  });

  // 콤마가 포함된 문자열이 올바르게 포맷되는지
  test('콤마가 포함된 문자열도 올바르게 처리해야 합니다.', () => {
    expect(formatPrice('1,000,000')).toBe('1,000,000');
  });

  // 0이 올바르게 포맷되는지
  test('0은 "0"으로 포맷되어야 합니다.', () => {
    expect(formatPrice(0)).toBe('0');
  });
});
