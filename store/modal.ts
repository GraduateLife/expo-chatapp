import { create } from 'zustand';

interface ModalState {
  isQRCodeVisible: boolean;
  showQRCode: () => void;
  hideQRCode: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isQRCodeVisible: true,
  showQRCode: () => set({ isQRCodeVisible: true }),
  hideQRCode: () => set({ isQRCodeVisible: false }),
}));
