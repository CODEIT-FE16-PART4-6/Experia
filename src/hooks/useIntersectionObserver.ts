import { useEffect, RefObject } from 'react';

/**
 * IntersectionObserver를 사용하여, 대상 요소가 뷰포트와 교차하는지 감지하는 훅
 * @param target 감지할 대상 DOM 요소의 Ref 객체
 * @param onIntersect target이 뷰포트에 들어왔을 때 실행할 콜백 함수
 * @param enabled 훅의 활성화/비활성화 여부
 * @param root 스크롤 감지 대상 HTMLElement
 * @param rootMargin 교차 감지를 시작할 뷰포트 여백 (기본값: '0px')
 *   - '200px'으로 설정 시, 대상 요소가 실제 뷰포트에 들어오기 200px 전부터 감지가 시작됨
 */

interface Props {
  target: RefObject<HTMLDivElement | null>;
  onIntersect: () => void;
  enabled: boolean;
  root?: HTMLElement | null;
  rootMargin?: string;
}

const useIntersectionObserver = ({
  target,
  onIntersect,
  enabled,
  root,
  rootMargin = '0px',
}: Props) => {
  useEffect(() => {
    if (!enabled) return;
    const el = target?.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root,
        rootMargin,
      },
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [enabled, onIntersect, target, root, rootMargin]);
};

export default useIntersectionObserver;
