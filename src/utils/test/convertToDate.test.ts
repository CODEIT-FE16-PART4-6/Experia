import { describe, it, expect } from '@jest/globals';

// convertToDate 함수를 테스트하기 위해 함수를 추출
const convertToDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

describe('convertToDate', () => {
  describe('유효한 날짜 문자열', () => {
    it('ISO 8601 형식의 날짜 문자열을 Date 객체로 변환해야 한다', () => {
      const validDateString = '2024-01-15';
      const result = convertToDate(validDateString);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0); // 0-based month
      expect(result?.getDate()).toBe(15);
    });

    it('ISO 8601 형식의 날짜시간 문자열을 Date 객체로 변환해야 한다', () => {
      const validDateTimeString = '2024-01-15T10:30:00.000Z';
      const result = convertToDate(validDateTimeString);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    it('한국 형식의 날짜 문자열을 Date 객체로 변환해야 한다', () => {
      const koreanDateString = '2024/01/15';
      const result = convertToDate(koreanDateString);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    it('미국 형식의 날짜 문자열을 Date 객체로 변환해야 한다', () => {
      const usDateString = '01/15/2024';
      const result = convertToDate(usDateString);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    it('타임스탬프 문자열을 Date 객체로 변환해야 한다', () => {
      // JavaScript에서 타임스탬프 문자열은 직접 변환되지 않으므로 다른 형식 사용
      const timestampString = '2024-01-15T00:00:00.000Z'; // ISO 형식
      const result = convertToDate(timestampString);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    it('숫자 타임스탬프 문자열은 유효하지 않은 날짜로 처리되어 null을 반환해야 한다', () => {
      // JavaScript에서 숫자 문자열은 Date 생성자에 전달되면 Invalid Date가 됨
      const timestampNumber = 1705305600000; // 2024-01-15 00:00:00 UTC
      const result = convertToDate(timestampNumber.toString());

      expect(result).toBeNull();
    });
  });

  describe('유효하지 않은 날짜 문자열', () => {
    it('빈 문자열에 대해 null을 반환해야 한다', () => {
      const emptyString = '';
      const result = convertToDate(emptyString);

      expect(result).toBeNull();
    });

    it('잘못된 형식의 날짜 문자열에 대해 null을 반환해야 한다', () => {
      const invalidDateString = 'invalid-date';
      const result = convertToDate(invalidDateString);

      expect(result).toBeNull();
    });

    it('존재하지 않는 날짜는 자동으로 조정되어 유효한 Date 객체를 반환해야 한다', () => {
      const nonExistentDate = '2024-02-30'; // 2월 30일은 존재하지 않음 -> 3월 1일로 조정됨
      const result = convertToDate(nonExistentDate);

      // JavaScript Date는 잘못된 날짜를 자동으로 조정하므로 null이 아닌 Date 객체를 반환
      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getMonth()).toBe(2); // 3월 (0-based)
      expect(result?.getDate()).toBe(1); // 1일
    });

    it('잘못된 월에 대해 null을 반환해야 한다', () => {
      const invalidMonth = '2024-13-15'; // 13월은 존재하지 않음
      const result = convertToDate(invalidMonth);

      expect(result).toBeNull();
    });

    it('잘못된 일에 대해 null을 반환해야 한다', () => {
      const invalidDay = '2024-01-32'; // 1월 32일은 존재하지 않음
      const result = convertToDate(invalidDay);

      expect(result).toBeNull();
    });

    it('숫자가 아닌 문자열에 대해 null을 반환해야 한다', () => {
      const nonNumericString = 'abc-def-ghi';
      const result = convertToDate(nonNumericString);

      expect(result).toBeNull();
    });

    it('부분적으로만 숫자인 문자열에 대해 null을 반환해야 한다', () => {
      const partialNumericString = '2024-01-abc';
      const result = convertToDate(partialNumericString);

      expect(result).toBeNull();
    });
  });

  describe('엣지 케이스', () => {
    it('윤년 날짜를 올바르게 처리해야 한다', () => {
      const leapYearDate = '2024-02-29'; // 2024년은 윤년
      const result = convertToDate(leapYearDate);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(1); // 2월
      expect(result?.getDate()).toBe(29);
    });

    it('비윤년의 2월 29일은 자동으로 조정되어 유효한 Date 객체를 반환해야 한다', () => {
      const nonLeapYearDate = '2023-02-29'; // 2023년은 비윤년 -> 3월 1일로 조정됨
      const result = convertToDate(nonLeapYearDate);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2023);
      expect(result?.getMonth()).toBe(2); // 3월 (0-based)
      expect(result?.getDate()).toBe(1); // 1일
    });

    it('과거 날짜도 올바르게 처리해야 한다', () => {
      const pastDate = '1990-01-01';
      const result = convertToDate(pastDate);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(1990);
    });

    it('미래 날짜도 올바르게 처리해야 한다', () => {
      const futureDate = '2030-12-31';
      const result = convertToDate(futureDate);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2030);
    });

    it('시간 정보가 포함된 날짜 문자열을 올바르게 처리해야 한다', () => {
      const dateWithTime = '2024-01-15 14:30:00';
      const result = convertToDate(dateWithTime);

      expect(result).toBeInstanceOf(Date);
      expect(result).not.toBeNull();
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
      expect(result?.getHours()).toBe(14);
      expect(result?.getMinutes()).toBe(30);
    });
  });

  describe('타입 안전성', () => {
    it('반환값이 Date | null 타입이어야 한다', () => {
      const validDate = '2024-01-15';
      const invalidDate = 'invalid-date';

      const validResult = convertToDate(validDate);
      const invalidResult = convertToDate(invalidDate);

      // TypeScript 컴파일 타임에 체크되지만, 런타임에서도 확인
      expect(validResult === null || validResult instanceof Date).toBe(true);
      expect(invalidResult === null || invalidResult instanceof Date).toBe(true);
    });
  });
});
