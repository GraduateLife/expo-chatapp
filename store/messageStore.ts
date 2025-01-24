import { create } from 'zustand';

interface MessageStore {
  // Message state
  message: string;
  setMessage: (message: string) => void;
  clearMessage: () => void;

  // Image state
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;

  // Reset all state
  reset: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  // Message handlers
  message: '',
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: '' }),

  // Image handlers
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),

  // Reset everything
  reset: () => set({ message: '', selectedImage: null }),
}));
