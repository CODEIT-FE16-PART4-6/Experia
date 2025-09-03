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
      modals: [...state.modals, { id: crypto.randomUUID(), content, closing: false }],
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
