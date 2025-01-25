import { create } from 'zustand';

interface InputStore {
  isInputFocused: boolean;
  setInputFocused: (focused: boolean) => void;
}

export const useInputStore = create<InputStore>((set) => ({
  isInputFocused: false,
  setInputFocused: (focused) => set({ isInputFocused: focused }),
}));
