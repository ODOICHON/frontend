import { create } from 'zustand';

export type ImageStore = {
  images: string[];
  setImages: (imageUrl: string) => void;
  resetImages: () => void;
};

export const imageStore = create<ImageStore>((set, get) => ({
  images: [],
  setImages: (imageUrl: string) => set({ images: [...get().images, imageUrl] }),
  resetImages: () => set({ images: [] }),
}));
