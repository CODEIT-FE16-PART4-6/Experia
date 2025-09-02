'use client';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalItem {
  content: ReactNode;
}

interface ModalState {
  modals: ModalItem[];
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAll: () => void;
}

const useModalStore = create<ModalState>(set => ({
  modals: [],
  openModal: content => {
    set(state => {
      return { modals: [...state.modals, { content }] };
    });
  },
  closeModal: () => set(state => ({ modals: state.modals.slice(0, -1) })), // 동시에 여러 개의 모달 뜰 경우, 맨 위(가장 마지막) 모달부터 닫기
  closeAll: () => set({ modals: [] }),
}));

export default useModalStore;
