type Timer = ReturnType<typeof setTimeout> | null;

/**
 *
 * @param fn 지연 실행할 함수
 * @param timeout [timeout=300] 지연 시간 (밀리초 단위)
 * @returns 지연 실행, 지연 실행 취소 기능을 가진 함수 반환
 *
 */
const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, timeout = 300) => {
  let timer: Timer = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced as T & { cancel: () => void }; // 교차 타입으로 리턴 (함수 T이면서 동시에 cancel 메서드도 가지고 있는 함수)
};

export default debounce;
