'use client';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalItem {
  id: string;
  content: ReactNode;
  closing?: boolean;
}

interface ModalState {
  modals: ModalItem[];
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAll: () => void;
  removeModal: (id: string) => void;
}

const useModalStore = create<ModalState>(set => ({
  modals: [],
  openModal: content => {
    set(state => ({
      // crypto.randomUUID()가 일부 브라우저 및 SSR(서버사이드 렌더링) 환경에서 호환성 문제가 발생할 수 있어,
      // 보다 범용적인 Date.now()와 Math.random()의 조합으로 고유 ID를 생성하도록 수정했습니다.
      modals: [
        ...state.modals,
        { id: `modal-${Date.now()}-${Math.random()}`, content, closing: false },
      ],
    }));
  },
  closeModal: () => {
    set(state => {
      if (state.modals.length === 0) return state;
      const lastModal = state.modals[state.modals.length - 1];
      return {
        modals: [
          ...state.modals.slice(0, -1),
          { ...lastModal, closing: true }, // 모달 닫기 애니메이션 적용
        ],
      };
    });
  },
  closeAll: () => set({ modals: [] }), // 여러 개 모달 동시 닫기 (예: 페이지 이동)
  removeModal: (id: string) =>
    set(state => ({
      modals: state.modals.filter(m => m.id !== id),
    })),
}));

export default useModalStore;
