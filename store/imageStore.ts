import { create } from 'zustand';

interface ImageStore {
  selectedImage: string | null;
  setSelectedImage: (url: string | null) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  selectedImage: null,
  setSelectedImage: (url) => set({ selectedImage: url }),
}));
