import { create } from "zustand";

export const useScrollStore = create((set) => ({
  scroll: 0, // 0.0 – 1.0
  setScroll: (value) => set({ scroll: value }),
}));
