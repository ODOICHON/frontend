import { create } from 'zustand';

export type MenuToggleStore = {
  toggle: boolean;
  setToggle: (state: boolean) => void;
};

export const menuToggleStore = create<MenuToggleStore>((set) => ({
  toggle: false,
  setToggle: (state: boolean) => set({ toggle: state }),
}));
