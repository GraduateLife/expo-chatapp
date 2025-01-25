import { create } from 'zustand';

interface ImageProperties {
  uri: string;
  height: number;
  width: number;
  type?: string;
  fileSize?: number;
}

interface MessageStore {
  // Flattened state
  message: string;
  imageUri: string | null;
  imageHeight: number | null;
  imageWidth: number | null;
  imageType: string | null;
  imageFileSize: number | null;

  // Actions
  setMessage: (message: string) => void;
  clearMessage: () => void;
  setImageProperties: (image: ImageProperties | null) => void;
  reset: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  // Flattened state
  message: '',
  imageUri: null,
  imageHeight: null,
  imageWidth: null,
  imageType: null,
  imageFileSize: null,

  // Actions
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: '' }),

  setImageProperties: (image) =>
    set({
      imageUri: image?.uri || null,
      imageHeight: image?.height || null,
      imageWidth: image?.width || null,
      imageType: image?.type || null,
      imageFileSize: image?.fileSize || null,
    }),

  reset: () =>
    set({
      message: '',
      imageUri: null,
      imageHeight: null,
      imageWidth: null,
      imageType: null,
      imageFileSize: null,
    }),
}));
